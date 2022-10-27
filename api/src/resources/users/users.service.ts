import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { EntitiesConstants } from '../../database/entities.constants';
import { Product } from '../products/models/product.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { Roles } from './Role/Role.map';
  
@Injectable()
export class UsersService {
  auth0Manager: ManagementClient;

  constructor(
    @Inject(EntitiesConstants.USERS_REPOSITORY)
    private userRepository: typeof User,
  ) {
    this.auth0Manager = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET
    });
  }

  // synchronize local database with registered users in auth0
  onModuleInit() {    
    this.auth0Manager.getUsers()
    .catch((err) => {
      if(err) return err;
    })
    .then((auth0Users) => {
      auth0Users.forEach(async (user) => {
        let savedUser = await this.userRepository.findByPk(user.user_id)
        .catch(err => {
          if(err) return err;
        })
        if(!savedUser) {
          savedUser = new User({
            id: user.user_id,
            username: user.name,
            roleName: "User",
            email: user.email,
            picture: "",
            products: []
          })
          savedUser.save()
          .catch(err => {
            if(err) return err;
          })
        }
      })
    });
  }
  
  //  =================================================================================

  /* ----------------------------------------------------------------------------------
  Get all users
  
  */
  async findAll() {
    return await this.userRepository.findAll({
      include: [
        "boughtProducts", 
        "likedBands",
        "subbedBands"
      ]
    })    
    .catch((err) => {
      if(err) return err;
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Find a user and save it by primary key
  
  */
  findByPk(id: string): Promise<void | User> {
    const foundRecord: Promise<User> = this.userRepository.findByPk(id);
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;
  }
  
  /* ----------------------------------------------------------------------------------
  Update a user
  
  */
  update(id: string, userDto: UpdateUserDto): Promise<[number]> {
    return this.userRepository.update({userDto}, {
      where: { 
        id, 
      },
    })  
  }  
  
  /* ----------------------------------------------------------------------------------
  Delete a user
  
  */
  remove(id: string): Promise<number> {
    return this.userRepository.destroy({
      where: { id: +id }
    })  
  }
  
  //  ================================================================================
  
  /* ----------------------------------------------------------------------------------
  Upload a picture for a user
    
  */
  uploadProfilePicture(id: string, picture: any): Promise<User> {
    return this.userRepository.findByPk(id)
    .catch((err) => {
      if(err) return err;
    })
    .then((user) => {
      user.picture = picture.buffer.toString('base64')
      return user.save()
    })
  }
  
  
  //  ================================================================================
  
  /* ----------------------------------------------------------------------------------
  Add a role to the user 
  
  */
  addRole(id: string, roleName: string): Promise<void> {Product
    const role = {
      "roles": [ Roles.get(roleName) ]
    };
    return this.auth0Manager.assignRolestoUser({ id }, role)
    .then(() => {
      this.userRepository.update({
        roleName: roleName,
      }, {
        where: { 
          id, 
        }
      })
    });
  }
  
  /* ----------------------------------------------------------------------------------
  Remove a role from a user 
  
  */
  removeRole(id: string, roleName: string): Promise<void> {
    const role = {
      "roles": [ Roles.get(roleName) ]
    };
    return this.auth0Manager.removeRolesFromUser({ id }, role)
    .then(() => {
      // TODO: fix hardcoded role name
      this.userRepository.update({
        roleName: "User",
      }, {
        where: { 
          id, 
        }
      })
    });
  }
  
  //  ================================================================================
  
  /* ----------------------------------------------------------------------------------
  Get all products of a user.
  
  */
  getProducts(id: string): Promise<User> {
    const foundUser = this.userRepository.findByPk(id, {
      include: "boughtProducts"
    })
    
    if(!foundUser)
      throw new NotFoundException("User not found");
    else 
      return foundUser;
  }

  
  //  =================================================================================

  /* ----------------------------------------------------------------------------------
  Get all bands of which the user is a fan
  
  */
  async getLikedBands(userId: string) {
    
    const foundUser = await this.userRepository.findByPk(userId,  {
      include: "likedBands"
    })
    
    if(!foundUser)
      throw new NotFoundException("User not found");
    else 
      return foundUser;
    
  }
  
  
  //  =================================================================================

  /* ----------------------------------------------------------------------------------
  Get all bands of which the user is a groupie
  
  */
  async getSubbedBands(userId: string) {
    
    const foundUser = await this.userRepository.findByPk(userId,  {
      include: "subbedBands"
    })
    
    if(!foundUser)
      throw new NotFoundException("User not found");
    else 
      return foundUser;
    
  }
  
  
}
