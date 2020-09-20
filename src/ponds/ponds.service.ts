import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PondInput } from "./dto/ponds.input";
import { PondsArgs } from "./dto/ponds.args";
import { Pond } from "./pond.schema";
import { PondType } from "./dto/ponds.dto";
import { __Logger } from "../--logger/--logger.service";

@Injectable()
export class PondsService {
    constructor(
        @Inject(__Logger) private readonly logger: __Logger,
        @InjectModel(Pond.name) private readonly pondModel: Model<Pond>
    ) {
        this.logger.setContext(PondsService.name);
    }

    async create(data: PondInput): Promise<Pond> {
        const createdPond = new this.pondModel({
            ...data,
            creationDate: new Date(),
        });
        return createdPond.save();
    }

    async findOneById(id: string): Promise<PondType> {
        return await this.pondModel.findOne({ _id: id });
    }

    async findAll(pondsArgs: PondsArgs): Promise<PondType[]> {
        this.logger.log(pondsArgs);
        return await this.pondModel.find().exec();
    }

    async remove(id: string): Promise<PondType> {
        return await this.pondModel.findByIdAndRemove(id);
    }
}
