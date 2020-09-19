import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { PondInput } from "./dto/ponds.input";
import { PondsArgs } from "./dto/ponds.args";
import { Pond } from "./pond.model";
import { PondsService } from "./ponds.service";

const pubSub = new PubSub();

@Resolver((of) => Pond)
export class PondsResolver {
    constructor(private readonly pondsService: PondsService) {}

    @Query((returns) => Pond)
    async pond(@Args("id") id: string): Promise<Pond> {
        const recipe = await this.pondsService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        return recipe;
    }

    @Query((returns) => [Pond])
    ponds(@Args() pondsArgs: PondsArgs): Promise<Pond[]> {
        return this.pondsService.findAll(pondsArgs);
    }

    @Mutation((returns) => Pond)
    async addPond(@Args("pondData") pondData: PondInput): Promise<Pond> {
        const pond = await this.pondsService.create(pondData);
        pubSub.publish("pondAdded", { pondAdded: pond });
        return pond;
    }

    @Mutation((returns) => Boolean)
    async removePond(@Args("id") id: string) {
        return this.pondsService.remove(id);
    }

    @Subscription((returns) => Pond)
    pondAdded() {
        return pubSub.asyncIterator("pondAdded");
    }
}
