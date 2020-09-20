import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { __Logger } from "../--logger/--logger.service";
import { DateScalar } from "../common/scalars/date.scalar";
import { ArticlesResolver } from "./articles.resolver";
import { ArticlesService } from "./articles.service";
import { Article, ArticleSchema } from "./article.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [ArticlesResolver, ArticlesService, DateScalar, __Logger],
})
export class ArticlesModule {}
