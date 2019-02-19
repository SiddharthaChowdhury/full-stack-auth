import graphqlHTTP from "express-graphql";
import {GQLSchema} from "./schema/GQLSchema";
import {GQLResolver} from "./resolver/GQLResolver";

export const GraphQLHandler =  graphqlHTTP({
    schema: GQLSchema,
    rootValue: GQLResolver, // should cater for `RootMutation` and `RootSchema` in file `/schema/GQLSchema`
    graphiql: process.env.NODE_ENV === "development"
});
