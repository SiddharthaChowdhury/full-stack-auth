import {IdGQLTypes} from "../IdGQLTypes";

export const GQLTypePost = `
    type ${IdGQLTypes.POST} {
        _id: ID!
        title: String!
        description: String!
        createdBy: ${IdGQLTypes.USER}!
    }
`;

export const GQLInputPostCreate = `
    input ${IdGQLTypes.POST_CREATE} {
        title: String!
        description: String!
    }
`;

export interface IGQLInputPostCreate {
    title: string;
    description: string;
}
