import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";

import { ArticleInput } from "./dto/article.input";
import { ArticleArgs } from "./dto/article.args";
import { ArticlesService } from "./articles.service";
import { ArticleType } from "./dto/article.dto";

const pubSub = new PubSub();

@Resolver()
export class ArticlesResolver {
    constructor(private readonly articlesService: ArticlesService) {}

    @Query((returns) => ArticleType)
    async article(@Args("id") id: string): Promise<ArticleType> {
        const article = await this.articlesService.findOneById(id);
        if (!article) {
            throw new NotFoundException(id);
        }
        return article;
    }

    @Query((returns) => [ArticleType])
    articles(@Args() articleArgs: ArticleArgs): Promise<ArticleType[]> {
        return this.articlesService.findAll(articleArgs);
    }

    @Mutation((returns) => ArticleType)
    async addArticle(
        @Args("articleData") articleData: ArticleInput
    ): Promise<ArticleType> {
        const article = await this.articlesService.create(articleData);
        pubSub.publish("articleAdded", { articleAdded: article });
        return article;
    }

    @Mutation((returns) => Boolean)
    async removeArticle(@Args("id") id: string) {
        return this.articlesService.remove(id);
    }

    @Subscription((returns) => ArticleType)
    articleAdded() {
        return pubSub.asyncIterator("articleAdded");
    }
}
