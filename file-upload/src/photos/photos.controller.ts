import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile, readFileSync, writeFile } from 'fs';
import { diskStorage } from 'multer';
import {v4 as uuidv4} from 'uuid'

@Controller('photos')
export class PhotosController {
    @Post("upload")
    @UseInterceptors(
        FileInterceptor("photo",{
            storage:diskStorage({
                destination:function(req,file,cb){
                    cb(null,'upload')
                },
                filename:(req,file,cb)=>{
                    cb(null,uuidv4()+file.originalname)
                }
            })
        })
    )
    uploadSingle(@UploadedFile() file,@Body() userName){

        readFile("db.json","utf-8",(err,data)=>{
            if(err) console.log(err)
            else{
                let dataObject=JSON.parse(data)
                var dataToAdd=[
                    ...dataObject,
                    {
                        userName:userName.userName,
                        pathToImage:file.path,
                        imageName:file.originalname
                    }
                ]

                let newData=JSON.stringify(dataToAdd)
                writeFile("db.json",newData,(err)=>{
                    if(err) console.log(err)
                })
            }
        })

        const dataToAdd=readFileSync("db.json","utf-8")
            return {
                "msg":"File Uploaded",
                "imageData":JSON.parse(dataToAdd)
            }
        }
    }