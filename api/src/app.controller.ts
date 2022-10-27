import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
	
  @Get()
  @Redirect('/docs', 301)
  index(): string {
    return 'This action returns all cats';
  }
}