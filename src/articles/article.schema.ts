import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Article extends Document {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    creationDate: Date;
    @Prop()
    opts: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
