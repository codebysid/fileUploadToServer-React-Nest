import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post()
  // async createUser(@Body() userDto:User){
  //   console.log(userDto)
  //   return this.appService.createUser(userDto)
  // }
}
