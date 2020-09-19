import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pond {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    creationDate: Date;

    @Field(type => [String])
    opts: string[];
}