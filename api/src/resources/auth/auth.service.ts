import { Inject } from '@nestjs/common';
import { AuthenticationClient, ManagementClient } from 'auth0';
import { decode } from 'jsonwebtoken';
import { EntitiesConstants } from '../../database/entities.constants';
import { User } from '../users/models/user.model';
import { Roles } from '../users/Role/Role.map';
import { LoginForm } from './dto/loginForm.dto';
import { RegisterForm } from './dto/registerForm.dto';

export class AuthService {
	private auth0: AuthenticationClient;
	private auth0Manager: ManagementClient;

	
	
	constructor(
		@Inject(EntitiesConstants.USERS_REPOSITORY)
		private userRepository: typeof User,
	) {
		this.auth0 = new AuthenticationClient({
			domain: process.env.AUTH0_DOMAIN,
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET
		});

		this.auth0Manager = new ManagementClient({
			domain: process.env.AUTH0_DOMAIN,
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET
		});
	}
	
	
	
	/* Create a new user.
		upon creating a new user. It will be added to the auth0 database, as well as the local database.
		
		EXCEPTIONS:
			User already exists in auth0
				> check if it exists in local storage and add it in case it is not,
					then return an exception mentioning the user already exists
			
			User already exists in local storage somehow.
				> update it to make sure eventual changes are in sync
					return success message
					
			
			Default Role does not exist within auth0 somehow
				> return server error
	*/
	async register(registerForm: RegisterForm) {	
		const user = {
			connection: process.env.AUTH0_CONNECTION,
			email: registerForm.email,
			password: registerForm.password,
			username: registerForm.username,
		}
		
		return this.auth0Manager.createUser(user)
		.catch((err) => {
			console.log(err);
			return err;
		})
		.then((createdUser) => {
			const userId = {
				id: createdUser.user_id
			};
			
			// TODO fix magic string
			const defaultRole = {
				"roles": [ Roles.get("User") ]
			};

			return this.auth0Manager.assignRolestoUser(userId, defaultRole)
			.catch((err) => {
				return err;
			})
			.then(() => {
				const dbUser = {
					id: createdUser.user_id,
					username: createdUser.nickname,
					email: createdUser.email,
					roleName: "User",
					picture: ""
				}
				
				return this.userRepository.create(dbUser)
				.catch((err) => {
					//TODO rollback auth0 user creation
					return err;
				});
			});
		});
	}
		
	
	
	
	/* Login user and return an access token along with user details from local database
	
		EXCEPTIONS:
			wrong credentials
				> return wrong credentials exception
				

	*/
	async login(loginForm: LoginForm) {
		const data = {
			username: loginForm.email,
			password: loginForm.password,
			realm: process.env.AUTH0_CONNECTION,
			scope: 'openid'
		};
		try {
			const tokenRes = await this.auth0.passwordGrant(data);
			
			
			const { sub } = decode(tokenRes.id_token) as {
				sub: string
			}
			
			const userDetails = await this.userRepository.findByPk(sub)
			return {
				access_token: tokenRes.access_token,
				user_details: userDetails
			}
		} 
		catch(err) {
			console.log(err)
			return err;
		}
	}		
}





