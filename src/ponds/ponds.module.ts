import { Module } from "@nestjs/common";
import { __Logger } from "../--logger/--logger.service";
import { DateScalar } from "../common/scalars/date.scalar";
import { PondsResolver } from "./ponds.resolver";
import { PondsService } from "./ponds.service";

@Module({
    providers: [PondsResolver, PondsService, DateScalar, __Logger],
})
export class PondsModule {}
