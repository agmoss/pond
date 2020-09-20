import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ArticleInput } from "./dto/article.input";
import { ArticleArgs } from "./dto/article.args";
import { Article } from "./article.schema";
import { ArticleType } from "./dto/article.dto";
import { __Logger } from "../--logger/--logger.service";

@Injectable()
export class ArticlesService {
    constructor(
        @Inject(__Logger) private readonly logger: __Logger,
        @InjectModel(Article.name) private readonly articleModel: Model<Article>
    ) {
        this.logger.setContext(ArticlesService.name);
    }

    async create(data: ArticleInput): Promise<Article> {
        const createdArticle = new this.articleModel({
            ...data,
            creationDate: new Date(),
        });
        return createdArticle.save();
    }

    async findOneById(id: string): Promise<ArticleType> {
        return await this.articleModel.findOne({ _id: id });
    }

    async findAll(articleArgs: ArticleArgs): Promise<ArticleType[]> {
        this.logger.log(articleArgs);
        return await this.articleModel.find().exec();
    }

    async remove(id: string): Promise<ArticleType> {
        return await this.articleModel.findByIdAndRemove(id);
    }
}
