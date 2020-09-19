import { Inject, Injectable } from "@nestjs/common";
import { PondInput } from "./dto/ponds.input";
import { PondsArgs } from "./dto/ponds.args";
import { Pond } from "./pond.model";
import { __Logger } from "../--logger/--logger.service";

@Injectable()
export class PondsService {
    constructor(@Inject(__Logger) private readonly logger: __Logger) {
        this.logger.setContext(PondsService.name);
    }

    async create(data: PondInput): Promise<Pond> {
        return {
            id: "create",
            title: data.title,
            description: data.description,
            creationDate: new Date(),
            opts: data.opts,
        } as Pond;
    }

    async findOneById(id: string): Promise<Pond> {
        return {
            id: id,
            title: "create",
            description: "create.description",
            creationDate: new Date(),
            opts: ["create.opts"],
        } as Pond;
    }

    async findAll(pondsArgs: PondsArgs): Promise<Pond[]> {
        this.logger.log(pondsArgs);
        return [
            {
                id: "findAll",
                title: "findAll ponds",
                description: "findAll.description",
                creationDate: new Date(),
                opts: ["findAll.opts"],
            } as Pond,
        ] as Pond[];
    }

    async remove(id: string): Promise<string> {
        return id;
    }
}
