import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";

import { PondInput } from "./dto/ponds.input";
import { PondsArgs } from "./dto/ponds.args";
import { PondsService } from "./ponds.service";
import { PondType } from "./dto/ponds.dto";

const pubSub = new PubSub();

@Resolver()
export class PondsResolver {
    constructor(private readonly pondsService: PondsService) {}

    @Query((returns) => PondType)
    async pond(@Args("id") id: string): Promise<PondType> {
        const recipe = await this.pondsService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        return recipe;
    }

    @Query((returns) => [PondType])
    ponds(@Args() pondsArgs: PondsArgs): Promise<PondType[]> {
        return this.pondsService.findAll(pondsArgs);
    }

    @Mutation((returns) => PondType)
    async addPond(@Args("pondData") pondData: PondInput): Promise<PondType> {
        const pond = await this.pondsService.create(pondData);
        pubSub.publish("pondAdded", { pondAdded: pond });
        return pond;
    }

    @Mutation((returns) => Boolean)
    async removePond(@Args("id") id: string) {
        return this.pondsService.remove(id);
    }

    @Subscription((returns) => PondType)
    pondAdded() {
        return pubSub.asyncIterator("pondAdded");
    }
}
