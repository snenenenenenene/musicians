
import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Ip, NotFoundException, Param, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountDetailsDto } from '../../stripe/dto/AccountDetails.dto';
import { StripeService } from '../../stripe/stripe.service';
import { CreateGoalDto } from '../goals/dto/create-goal.dto';
import { UpdateGoalDto } from '../goals/dto/update-goal.dto';
import { GoalsService } from '../goals/goals.service';
import { Goal } from '../goals/models/goal.model';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';
import { CreateSoundDto } from '../sounds/dto/create-sound.dto';
import { UpdateSoundDto } from '../sounds/dto/update-sound.dto';
import { SoundsService } from '../sounds/sounds.service';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { BandService } from './band.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { Band } from './models/band.model';

@Controller('bands')
export class BandController {
  constructor(
    private readonly bandService: BandService,
    private readonly transactionService: TransactionsService,
    private readonly productsService: ProductsService,
    private readonly goalsService: GoalsService,
    private readonly soundsService: SoundsService,
    private readonly stripeService: StripeService,
  ) {}
  
  // BASIC CRUD =======================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all bands
  */
  @Get()
  async findAll(): Promise<Band[]> {
    return this.bandService.findAll();
  }
  
  /* ----------------------------------------------------------------------------------
  Create a new band
    Only musicians can add new bands
  */
  @Post()
  create(@Body() band: CreateBandDto): Promise<Band> {
    return this.bandService.create(band)
    .catch(err => {
      return err;
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Upload a profile picture for a band
    
  */
    @Patch(':id/profile-picture')
    @UseInterceptors(FileInterceptor('picture'))
    uploadProfilePicture(@Param('id') id: string, @UploadedFile() picture: any) {
      return this.bandService.uploadProfilePicture(id, picture)
      
      .catch(err => {
        return err;
      });
    }
  
  /* ----------------------------------------------------------------------------------
  Get a band by its primary key
    Anyone can look up a band by its key
  */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<void | Band> {
    return this.bandService.findByPk(+id)
    .catch(err => { 
      if(err instanceof NotFoundException)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  update the properties of a band
  
    EXCEPTIONS:
      - Band could not be found
      - Missing permissions
      - Missing ownership
  */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() band: UpdateBandDto): Promise<void | [number]> {
    return this.bandService.update(+id, band)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
      
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't update another man's band", HttpStatus.FORBIDDEN);
    });
  }

  /* ----------------------------------------------------------------------------------
  Delete a band
  
    EXCEPTIONS:
      - Band could not be found
      - Missing permissions
      - Missing ownership
  */
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void | number> {
    return this.bandService.remove([id])
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't delete another man's band", HttpStatus.FORBIDDEN);
    });
  }
  
  // Members  =========================================================================
  
  /* ----------------------------------------------------------------------------------
  Add a new member to a band.
  
  */
  @Post(':id/members')
  async registerBandMember(@Param('id') id: number, @Body() members: string[]) {
    return this.bandService.registerBandMembers(id, members);
  }
  
  /* ----------------------------------------------------------------------------------
  Get all members of a band
  
  */
  @Get(':id/members')
  getBandMembers(@Param('id') id: number) {
    return this.bandService.getBandMembers(id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a band member from a band
  
  */
  @Delete(':id/members')
  async removeBandMember(@Param('id') id: number, @Body() members: string[]) {
    return this.bandService.removeBandMembers(id, members);
  }
  
  // STRIPE  =========================================================================
  
  @Post(':id/stripe/activate')
  async getStripeAccountLoginLink(@Param('id') id: string, @Body() accountDetails: AccountDetailsDto) {
    const stripeAccount = await this.stripeService.createAccount(+id, accountDetails);
    console.log(stripeAccount);
    return stripeAccount;
  }
  
  @Get(':id/stripe/accept-tos')
  async acceptTermsOfService(@Param('id') id: string, @Ip() ip: string) {
    return this.stripeService.acceptTermsOfService(+id, ip);
  }
  
  
  /* TODO: Use the webhooks */
  @Get(':id/stripe/status')
  async checkStripeStatus(@Param('id') id: string, @Res() res) {
    return this.stripeService.checkStripeStatus(+id);
  }
  
  // PRODUCTS =========================================================================
  
  /* ----------------------------------------------------------------------------------
  Add a new product to a band
  
      EXCEPTIONS:
      - Band could not be found
      - Missing permissions
      - Missing ownership
  */
  @Post(':id/products')
  async createProduct(@Param('id') id: string, @Body() product: CreateProductDto) {
    return this.productsService.create(+id, product)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Band with given id not found", HttpStatus.NOT_FOUND);
        
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't create another band's product", HttpStatus.FORBIDDEN);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Upload a thumbnail to a product
  
    EXCEPTIONS:
      - Band could not be found
      - Missing permissions
      - Missing ownership
  */
  @Post(':id/products/:productId/thumbnail')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadThumbnail(@Param('id') id: string, @Param('productId') productId: string, @UploadedFile() thumbnail: any) {
    return this.productsService.uploadThumbnail(productId, thumbnail)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't create another band's product", HttpStatus.FORBIDDEN);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Read the products uploaded by a band.

  */
  @Get(':id/products')
  async getProducts(@Param('id') id: string) {
    return this.bandService.getProducts(+id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Update a product uploaded by a band.
  
  EXCEPTIONS:
    - product or band were not found
  */
  @Patch(':id/products/:productId')
  async updateProduct(@Param('id') id: string, @Param('productId') productId: string, @Body() productDto: UpdateProductDto) {
    return this.productsService.update(+productId, productDto)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't update another band's product", HttpStatus.FORBIDDEN);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a product from a band
  
  */
  @Delete(':id/products/:productId')
  async removeProduct(@Param('productId') productId: string) {
    return this.productsService.remove(+productId)
    .catch(err => {        
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        
      if(err instanceof ForbiddenException)
        throw new HttpException("Can't delete another band's product", HttpStatus.FORBIDDEN);
    });
  }
  
  // TRANSACTIONS =====================================================================
  
  /* ----------------------------------------------------------------------------------
  Buy a product
  
    EXCEPTIONS:
      - Band could not be found
      - Missing permissions
      - Missing ownership
  */
  @Post(':id/products/:productId/sell')
  async registerTransaction(@Param('id') id: string, @Param('productId') productId: number, @Body() transaction: CreateTransactionDto) {
    const soldTransaction = {
      amount: transaction.amount,
      recipient: id,
      sender: transaction.sender
    }
    
    return this.transactionService.createPayment(productId, soldTransaction)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  
  // GOALS ===========================================================================
  
  /* ----------------------------------------------------------------------------------
  Add a new Goal
    
    EXCEPTIONS:
      Can not add goal in name of another band
  */
  @Post(':id/goals')
  addGoals(@Param('id') id: number, @Body() createGoalDto: CreateGoalDto): Promise<void | Goal> {
    return this.goalsService.create(id, createGoalDto)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Get the goals of a band
    
  */
  @Get(':id/goals')
  // @Permissions("create:goals")
  getGoals(@Param('id') id: number): Promise<void | Band> {
    return this.bandService.getGoals(id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Update the properties of a goal
    
    EXCEPTIONS:
      Can not update goal in name of another band
  */
  @Patch(':id/goals/:goalId')
  updateGoal(@Param('id') id: number, @Param('goalId') goalId: number, @Body() updateGoalDto: UpdateGoalDto): Promise<void | [number]> {
    return this.goalsService.update(+goalId, updateGoalDto)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a goal
    
  
    EXCEPTIONS:
      Can not delete other bands' goals
  */
  @Delete(':id/goals/:goalId')
  removeGoal(@Param('id') id: number, @Param('goalId') goalId: number): Promise<void | number> {
    return this.goalsService.remove(+goalId)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    });
  }
  
  
  // SOUNDS ===========================================================================

  /* ----------------------------------------------------------------------------------
  Create a new sound for a band
  
  */
  @Post(':id/sounds')
  createSound(@Param('id') id: number,  @Body() createSoundDto: CreateSoundDto) {
    return this.soundsService.create(id, createSoundDto);
  }
  
  
  /* ----------------------------------------------------------------------------------
  Get all sounds of a band
  
  */
  @Get(':id/sounds')
  getSounds(@Param('id') id: number) {
    return this.bandService.getSounds(id);
  }
  
  /* ----------------------------------------------------------------------------------
  Update the properties of an existing sound
  
  */
  @Patch(':id/sounds/:soundId')
  updateSound(@Param('id') id: number, @Param('soundId') soundId: number, @Body() updateSoundDto: UpdateSoundDto) {
    return this.soundsService.update(soundId, updateSoundDto);
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a sound
  
  */
  @Delete(':id/sounds/:soundId')
  removeSound(@Param('id') id: number, @Param('soundId') soundId: number) {
    return this.soundsService.remove(soundId);
  }
  
  
  // FANS =============================================================================

  /* ----------------------------------------------------------------------------------
  Register a new fan to a band
  
  */
  @Post(":id/fans")
  async registerFan(@Param('id') id: number, @Body('fanId') fanId: string) {
    return this.bandService.registerFan(id, fanId)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
  
  
  /* ----------------------------------------------------------------------------------
  Get all fans of a band
  
  */
  @Get(':id/fans')
  getFans(@Param('id') id: number) {
    return this.bandService.getFans(id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a fan from a band
  
  */
  @Delete(':id/fans/:fanId')
  removeFan(@Param('id') id: number, @Param('fanId') fanId: string) {
    return this.bandService.removeFan(id, fanId)
    .catch(err => {
       console.log(err);
       throw err
    });
  }
  
  // GROUPIES =========================================================================

  /* ----------------------------------------------------------------------------------
  Register a new groupies to a band
  
  */
  @Post(":id/groupies")
  async registerGroupie(@Param('id') id: number, @Body('groupieId') groupieId: string) {
    return this.bandService.registerGroupie(id, groupieId)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
  
  
  /* ----------------------------------------------------------------------------------
  Get all groupies of a band
  
  */
  @Get(':id/groupies')
  getGroupies(@Param('id') id: number) {
    return this.bandService.getGroupies(id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Remove a groupie from a band
  
  */
  @Delete(':id/groupies/:groupieId')
  removeGroupie(@Param('id') id: number, @Param('groupieId') groupieId: string) {
    return this.bandService.removeGroupie(id, groupieId)
    .catch(err => {
       console.log(err);
       throw err
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
