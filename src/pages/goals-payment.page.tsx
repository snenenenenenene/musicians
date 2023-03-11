import React, { useContext, useState } from 'react';
import { MdEuro } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { CheckBox, TitleWithGoBack } from '../constants/Layout';
import { Goals } from '../constants/types';
import { donateToGoal, getGoalById } from '../services/api-calls';
import { GlobalContext } from '../services/store';

export const GoalPayment = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const idParam = Number(params.id);
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const { data }: { data?: Goals; error?: { message: string } | null; status?: string } = useQuery(
    'goals',
    () => getGoalById(user.id)
  );

  const [donation, setDonation] = useState<number>(10);
  const [check, setCheck] = useState('Credit Card');
  const handleCheck = (value: string) => {
    setCheck(value);
  };

  const mutation = useMutation((goalId: number) => donateToGoal(goalId, donation, user.id), {
    onSuccess: () => {
      toast(`Thanks for your donation!`, { type: 'success' });
      queryClient.invalidateQueries('goals');
      navigate(-1);
    },
  });

  return (
    <Container>
      <TitleWithGoBack title="Donation" />
      <section className="pb-6 mt-6 mb-6 flex md:pb-12 md:mb-12 border-b border-main-border">
        <header className="w-full flex">
          <div className="ml-5 flex flex-col">
            <h2 className="font-semibold text-3xl">{data?.name ? data.name : 'Product'}</h2>
            <div className="mt-auto">
              <p className="flex items-center text-main-text">
                Goal:&nbsp;
                <MdEuro />
                &nbsp;
                {data?.amountToAchieve && <>{data.amountToAchieve}</>}
              </p>
              <Input
                name="price"
                type="number"
                placeholder={10}
                onChange={(e) => setDonation(e.target.value)}
              />
            </div>
          </div>
        </header>
      </section>
      <CheckBox title="Credit Card" check={check} handleCheck={() => handleCheck('Credit Card')}>
        <div className="shadow p-5 rounded-3xl mb-5">
          <label>Cardholder name</label>
          <Input name="credit-card-holder" placeholder="Jane Doe" />{' '}
          <label>Credit card number</label>
          <Input name="credit-card-number" placeholder="*******" />
          <section className="flex space-x-5">
            <Input name="expiration-date" placeholder="MM/YY" />
            <Input name="cvv" placeholder="CVV" />
          </section>
          <Button
            name="donate-money"
            onClick={() => {
              mutation.mutate(idParam);
            }}
            className="w-full h-20 mt-5">
            <span className="flex justify-center items-center">
              Pay <MdEuro />
              &nbsp;{donation}
            </span>
          </Button>
        </div>
      </CheckBox>
      <CheckBox title="Bancontact" check={check} handleCheck={() => handleCheck('Bancontact')}>
        <></>
      </CheckBox>
      <CheckBox title="Paypal" check={check} handleCheck={() => handleCheck('Paypal')}>
        <></>
      </CheckBox>
    </Container>
  );
};
