
import { Inject, Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { EntitiesConstants } from "../database/entities.constants";
import { Band } from "../resources/bands/models/band.model";
import { AccountDetailsDto } from "./dto/AccountDetails.dto";


@Injectable()
export class StripeService {

  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null,
  });

  constructor(
    @Inject(EntitiesConstants.BANDS_REPOSITORY)
    private BandRepository: typeof Band,

  ) { }

  //================================================================

  /* ---------------------------------------------------------------
  creates a stripe account
  
  */
  async createAccount(bandId: number, accountDetails: AccountDetailsDto) {
    let bankAccount: Stripe.AccountCreateParams = {
      external_account: {
        object: "bank_account",
        country: "BE",
        currency: "EUR",
        account_holder_name: `${accountDetails.bank_account.accountHolderFirstName} ${accountDetails.bank_account.accountHolderLastame}`,
        account_number: accountDetails.bank_account.IBAN
      }
    }

    const stripeCreationObject: Stripe.AccountCreateParams = {
      type: 'custom',
      country: 'BE',
      capabilities: {
        bancontact_payments: { requested: true },
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      business_profile: {
        mcc: "5734",
        url: `${process.env.CLIENT_HOST}/band/${bandId}`
      },
      individual: accountDetails.individual,
      // TODO make it so this isnt set when there is no bank account specified
      external_account: bankAccount.external_account
    }

    const stripeAccount: Stripe.Account = await this.stripe.accounts.create(stripeCreationObject)

    this.BandRepository.update({
      stripeId: stripeAccount.id
    }, {
      where: { id: bandId }
    })

    // serve terms of service thingy


    return stripeAccount;
  }

  async acceptTermsOfService(bandId: number, ip: string) {
    const stripeId = (await this.BandRepository.findByPk(bandId)).stripeId;
    const updatedAccount = await this.stripe.accounts.update(
      stripeId,
      { tos_acceptance: { date: Math.round(Date.now() / 1000), ip: ip } }
    );
    return updatedAccount;
  }
  
  async getAccount(bandId: number) {
    const stripeId = (await this.BandRepository.findByPk(bandId)).stripeId;
    const stripeAccount = await this.stripe.accounts.retrieve(stripeId);
    return stripeAccount;
  }

  //================================================================

  async checkStripeStatus(bandId: number) {
    const stripeId = (await this.BandRepository.findByPk(bandId)).stripeId
    const stripeDetails = await this.stripe.accounts.retrieve(stripeId);

    console.log(stripeDetails)

  }

  async removeStripe(bandId: number) {
    const stripeId = (await this.BandRepository.findByPk(bandId)).stripeId;
    // it is only possible to delete an account when it has a neatral balance
    const response = await this.stripe.accounts.del(stripeId)
    return response;
  }
  
  //================================================================
  
  async executePayment(recipientId: number, senderId: number) {

  }
  
}
