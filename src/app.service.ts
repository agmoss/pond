import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getPond(): string {
        return "pond";
    }
}
