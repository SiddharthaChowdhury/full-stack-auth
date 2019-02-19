import {IdGQLTypes} from "../IdGQLTypes";

export const GQLTypeUser = `
    type ${IdGQLTypes.USER} {
        _id: ID!
        email: String!
        password: String!
        posts: [${IdGQLTypes.POST}!]
        createdAt: String!
    }
`;