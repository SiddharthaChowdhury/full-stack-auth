
// should cater for `RootMutation` and `RootSchema` in file `/schema/GQLSchema`
import {IGQLAPIs} from "../schema/GQLSchema";
import {userController} from "../../features/user/UserController";
import {postController} from "../../features/post/PostController";

export const GQLResolver: IGQLAPIs = {
    users: userController.getUsers,
    posts: postController.getPosts,
    createPost: postController.createPosts,
};
