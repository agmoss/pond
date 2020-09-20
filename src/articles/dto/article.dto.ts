import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class ArticleType {
    @Field(() => ID)
    readonly id?: string;
    @Field()
    readonly title: string;
    @Field()
    readonly description: string;
    @Field()
    readonly creationDate: Date;
    @Field((type) => [String])
    readonly opts: any;
}
