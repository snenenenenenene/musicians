import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginForm } from "./dto/loginForm.dto";
import { RegisterForm } from "./dto/registerForm.dto";



@Controller() 
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/login')
  login(@Body() loginForm: LoginForm) {
	  return this.authService.login(loginForm)
    .catch(err => {
      console.error("ERR:" + err)
      return err;
    });
  }
  
  @Post('/register')
  register(@Body() registerForm: RegisterForm) {
		console.log(registerForm)
	  return this.authService.register(registerForm)
  }
  
}