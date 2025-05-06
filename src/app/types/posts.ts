import { type Database } from './database';
import { User as SupabaseAuthUser } from '@supabase/supabase-js';

type PostEntity  = Database['public']['Tables']['posts']['Row'] 
type UserType = Database['public']['Tables']['public_user']['Row']

// export type Post = PostWithDetails[] | [];
export type PostWithDetails = PostEntity & {
    public_user: UserType;
    likes: Like[];
    comments: Comment[];
}
export type Like = {
    id: number;
    post_id: string | null;
    user_id: string;
    public_user: {
        id: string;
        username: string;
        avatar_url: string;
    };
}
export type Comment = {
    commented_post_id: string;
    comment_content: string;
    created_at: string | null;
    public_user: {
        id: string | '';
        username: string | '';
        avatar_url: string | '';
    };
};

export type ReactionControlsProps = {
    postId: string;
    likes: Like[];
    comments: Comment[];
    currentUser: SupabaseAuthUser | null;
}

export type AuthButtonProps = {
    currentUser: SupabaseAuthUser | null;
}

export interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface PostComponentProps {
    currentUser: SupabaseAuthUser | null;
    posts: PostWithDetails[];
}