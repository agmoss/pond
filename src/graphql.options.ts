import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        return {
            path: "/api",
            installSubscriptionHandlers: true,
            context: ({ req }) => ({ req }),
            useGlobalPrefix: true,
            debug: true,
            playground: true,
            autoSchemaFile: 'schema.gql',
        };
    }
}
