import {type Database } from './database';

type PostEntity  = Database['public']['Tables']['posts']['Row'] 
type UserType = Database['public']['Tables']['public_user']['Row']

export type Post = PostEntity & {
    public_user : UserType
};