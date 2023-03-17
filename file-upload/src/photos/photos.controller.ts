import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { readFile, readFileSync, writeFile } from 'fs';
import { diskStorage } from 'multer';
import {v4 as uuidv4} from 'uuid'

@Controller('photos')
export class PhotosController {
    @Post("upload")
    @UseInterceptors(
        FilesInterceptor("photo[]",20,{
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
    uploadSingle(@UploadedFiles() file,@Body() userName){

    
        readFile("db.json","utf-8",(err,data)=>{
            if(err) console.log(err)
            else{
                console.log(file,userName)
                let dataObject=JSON.parse(data)
                let tmp=[]
                file.forEach(element => {
                    tmp.push({
                        userName:userName.userName,
                        pathToImage:element.path,
                        imageName:element.originalname
                    })
                });
                var dataToAdd=[
                    ...dataObject,
                    ...tmp
                ]

                let newData=JSON.stringify(dataToAdd)
                writeFile("db.json",newData,(err)=>{
                    if(err) console.log(err)
                })
            }
        }
        )

        const dataToAdd=readFileSync("db.json","utf-8")
            return {
                "msg":"File Uploaded",
                "imageData":JSON.parse(dataToAdd)
            }
        }
    }