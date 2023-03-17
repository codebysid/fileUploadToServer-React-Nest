// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose";
// import { buffer } from "stream/consumers";

// export type UserDocument=User & Document

// @Schema()
// export class User{

//     @Prop()
//     username:string

//     @Prop({type:buffer})
//     fileData:object

//     @Prop()
//     fileURL:string

//     @Prop({default:Date.now})
//     dateAdded:Date
// }

// export const UserSchema=SchemaFactory.createForClass(User)