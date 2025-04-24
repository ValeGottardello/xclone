import { type Database } from './database';
import { User as SupabaseAuthUser } from '@supabase/supabase-js';

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
    postId: string;
    likes: Array<Likes>;
    comments: Array<Comments>;
    user: SupabaseAuthUser | null;
}

export type AuthButtonProps = {
    user: SupabaseAuthUser | null;
}

export interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }