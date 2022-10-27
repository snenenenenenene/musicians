import { Body, Controller, Delete, Get, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../products/products.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) {}
  
  // =======================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all users 
  
  */
  @Get()
  findAll() {
    return this.usersService.findAll()
    .catch(err => {
      console.log(err)
      throw err;
    });
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByPk(id)
    .catch(err => {
      console.log(err)
      throw err;
    });
  }
  
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user)
    .catch(err => {
      console.log(err)
      throw err;
    });
  }
  
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
    .catch(err => {
      console.log(err)
      throw err;
    });
  }
  
  
  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('picture'))
  uploadProfilePicture(@Param('id') id: string, @UploadedFile() picture: any) {
    return this.usersService.uploadProfilePicture(id, picture)
    .catch(err => {
      console.log(err)
      throw err;
    });
  }
  
  
  // =======================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all products of a user
  
  */
  @Get(':id/products')
  getProducts(@Param('id') id: string) {
    return this.usersService.getProducts(id)
    .catch(err => {
      throw err;
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Delete a product from the list of bought products a user has.
  
  */
  @Delete(':id/products/:productId')
  deleteProducts(@Param('id') id: string, @Param('productId') productId: number) {
    return this.productsService.remove(+productId)
    .catch(err => {
      throw err;
    })
  }
  
  
  // =======================================================================================
  
  
  @Patch(':id/roles')
  makeMusician(@Param('id') id: string, @Body('roleName') roleName : string) : Promise<void> {
    return this.usersService.addRole(id, roleName)
    .catch(err => {
      console.log(err)
      throw err;
    })
  }
  
  
  @Delete(':id/roles')
  removeRole(@Param('id') id: string, @Body('roleName') roleName : string) : Promise<void> {
    return this.usersService.removeRole(id, roleName)
    .catch(err => {
      console.log(err)
      throw err;
    })
  }
  
  
  // =======================================================================================
  
  
  @Get(':id/likedBands')
  getLikedBands(@Param('id') id: string) {
    return this.usersService.getLikedBands(id)
    .catch(err => {
      throw err;
    })
  }
    
  
  // =======================================================================================
  
  
  @Get(':id/subbedBands')
  getSubbedBands(@Param('id') id: string) {
    return this.usersService.getSubbedBands(id)
    .catch(err => {
      throw err;
    })
  }
  
  
}

