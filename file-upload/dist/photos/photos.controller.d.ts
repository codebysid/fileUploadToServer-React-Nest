export declare class PhotosController {
    uploadSingle(file: any, userName: any): {
        msg: string;
        imageData: any;
    };
    uploadVideo(file: any, userName: any): {
        msg: string;
    };
    fetchVideos(): {
        imageData: any;
    };
}
