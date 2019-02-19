import Post, {IPost} from "../../modelsDB/Post";
import {IGQLInputPostCreate} from "../../graphql/schema/GQLSchemaPost";
import User from "../../modelsDB/User";

class PostController {
    public createPosts = (args: any) => {
        const input: IGQLInputPostCreate = args.input;
        const postData: IPost = {
            title: input.title,
            description: input.description,
            createdAt: new Date(),
            createdBy: '5c66cc3da9874411586aa990'
        };

        const post = new Post(postData);
        return post.save()
            .then((savedPost: any) => {
                return {
                    ...savedPost._doc,
                    _id: savedPost.id.toString()
                }
            })
    };

    public getPosts = (args: any) => {
        return Post.find()
            .then((posts: any[]) => {
                return posts.map((post: any) => {
                    return {
                        ...post._doc,
                        _id: post._doc._id.toString(),
                        createdBy: this.getUserByID(post._doc.createdBy)
                    }
                })
            })
    };

    private getUserByID = (userID: string) => {
        return User.findOne(userID)
            .then((user: any) => {
                if (!user) {
                    throw new Error("Related user details are not found")
                }
                return {
                    _id: user.id.toString(),
                    ...user._doc
                }
            })
            .catch(err => {
                throw err;
            })
    }
}

export const postController = new PostController();