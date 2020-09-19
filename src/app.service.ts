import { Injectable } from "@nestjs/common";
import pkg from "../package.json";

@Injectable()
export class AppService {
    getPond(): Record<string, any> {
        return pkg
    }
}
