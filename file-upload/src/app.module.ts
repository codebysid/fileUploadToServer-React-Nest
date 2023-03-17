import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from './photos/photos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './user.schema';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'upload'),
  }),PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// MongooseModule.forRoot('mongodb+srv://sidmj7403:oCghHMwMaVN6K3mr@user.qmwl141.mongodb.net/?retryWrites=true&w=majority'),
//   MongooseModule.forFeature([{name:'user',schema:UserSchema}]),