import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { __Logger } from "../--logger/--logger.service";
import { DateScalar } from "../common/scalars/date.scalar";
import { PondsResolver } from "./ponds.resolver";
import { PondsService } from "./ponds.service";
import { Pond, PondSchema } from "./pond.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Pond.name, schema: PondSchema }]),
    ],
    providers: [PondsResolver, PondsService, DateScalar, __Logger],
})
export class PondsModule {}
