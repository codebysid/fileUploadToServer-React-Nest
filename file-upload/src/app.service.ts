import { Inject, Injectable } from '@nestjs/common';
// import {User,UserDocument} from './user.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectModel('user') private readonly userModel:Model<UserDocument>
  // ){}

  // async createUser(user:User):Promise<User>{
  //   const newUser=new this.userModel(user)
  //   return newUser.save()
  // }
}
 