import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import pkg from "../package.json"

describe("AppController", () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
    });

    describe("getPond", () => {
        it("should return pond", () => {
            const appController = app.get<AppController>(AppController);
            expect(appController.getPond()).toBe(pkg);
        });
    });
});
