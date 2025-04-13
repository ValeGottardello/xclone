import {type Database } from './database';

type PostEntity  = Database['public']['Tables']['posts']['Row'] 
type UserType = Database['public']['Tables']['public_user']['Row']

export type Post = PostEntity & {
    public_user : UserType
    likes: Array<Likes>;
    comments: Array<Comments>;
};

export type Likes = {
    userId: string;
    postId: string;
};

export type Comments = {
    userId: string;
    postId: string;
    commentContent: string;
    createdAt: string;
};

export type ReactionControlsProps = {
    likes: Array<Likes>;
    comments: Array<Comments>;
}

