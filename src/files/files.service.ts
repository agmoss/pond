import { Injectable } from "@nestjs/common";

@Injectable()
export class FilesService {
    async uploadFile(file: any) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    async uploadMultipleFiles(files: any) {
        const response = [];
        files.forEach((file: { originalname: any; filename: any }) => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }
}
