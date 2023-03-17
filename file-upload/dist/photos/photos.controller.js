"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
let PhotosController = class PhotosController {
    uploadSingle(file, userName) {
        (0, fs_1.readFile)("db.json", "utf-8", (err, data) => {
            if (err)
                console.log(err);
            else {
                console.log(file, userName);
                let dataObject = JSON.parse(data);
                let tmp = [];
                file.forEach(element => {
                    tmp.push({
                        userName: userName.userName,
                        pathToImage: element.path,
                        imageName: element.originalname
                    });
                });
                var dataToAdd = [
                    ...dataObject,
                    ...tmp
                ];
                let newData = JSON.stringify(dataToAdd);
                (0, fs_1.writeFile)("db.json", newData, (err) => {
                    if (err)
                        console.log(err);
                });
            }
        });
        const dataToAdd = (0, fs_1.readFileSync)("db.json", "utf-8");
        return {
            "msg": "File Uploaded",
            "imageData": JSON.parse(dataToAdd)
        };
    }
};
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("photo[]", 20, {
        storage: (0, multer_1.diskStorage)({
            destination: function (req, file, cb) {
                cb(null, 'upload');
            },
            filename: (req, file, cb) => {
                cb(null, (0, uuid_1.v4)() + file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "uploadSingle", null);
PhotosController = __decorate([
    (0, common_1.Controller)('photos')
], PhotosController);
exports.PhotosController = PhotosController;
//# sourceMappingURL=photos.controller.js.map