import {buildSchema, GraphQLTypeResolver} from "graphql";
import {GQLTypeUser} from "./GQLSchemaUser";
import {GQLInputPostCreate, GQLTypePost} from "./GQLSchemaPost";
import {IdGQLTypes} from "../IdGQLTypes";

export const GQLSchema = buildSchema(`
    ${GQLTypeUser}
    
    ${GQLTypePost}
    
    ${GQLInputPostCreate}
    
    type RootQuery {
        users: [${IdGQLTypes.USER}!]!
        posts: [${IdGQLTypes.POST}!]!
    }
    
    type RootMutation {
        createPost(input: ${IdGQLTypes.POST_CREATE}): ${IdGQLTypes.POST}
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export interface IGQLAPIs {
    users: any;
    posts: any;
    createPost: any;
}
