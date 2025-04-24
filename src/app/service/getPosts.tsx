import { postsWithDetails as structurePostsData } from '../service/structure-post-data'; 
import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
    const supabase  = await createClient();
    const { data: posts, error: postsError } = await supabase
                                                .from('posts')
                                                .select(`
                                                    id,
                                                    content,
                                                    created_at,
                                                    user_id,
                                                    public_user:public_user!posts_user_id_fkey1(username, name, avatar_url)
                                                `)
                                                .order('created_at', { ascending: false });

    if (postsError) {
        console.error(postsError);
    }

    const { data: likes, error: likesError } = await supabase
                                                        .from('likes')
                                                        .select(`
                                                        id,
                                                        post_id,
                                                        public_user(username)
                                                        `);

    const { data: comments, error: commentsError } = await supabase
                                                        .from('comments')
                                                        .select('commented_post_id, public_user:public_user!comments_user_id_fkey(username), comment_content, created_at')
    
    const { data: { user } } = await supabase.auth.getUser();

    if (commentsError || likesError) {
        console.error("ERROR",commentsError, likesError);
    }
    if (!user) {
        return { redirectToLogin: true }; 
    }

    const postsWithDetails = await structurePostsData(posts, likes, comments);

    return {
        postsWithDetails,
        user,
    }
}
export async function getUserPosts({ userId }: { userId: string }) {
    const supabase  = await createClient();
    const { data: posts, error: postsError } = await supabase
                                                .from('posts')
                                                .select(`
                                                    id,
                                                    content,
                                                    created_at,
                                                    user_id,
                                                    public_user:public_user!posts_user_id_fkey1(username, name, avatar_url)
                                                `)
                                                .order('created_at', { ascending: false })
                                                .eq('user_id', userId);

    if (postsError) {
        console.error(postsError);
    }

    const { data: likes, error: likesError } = await supabase
                                                        .from('likes')
                                                        .select(`
                                                        id,
                                                        post_id,
                                                        public_user(username)
                                                        `);

    const { data: comments, error: commentsError } = await supabase
                                                        .from('comments')
                                                        .select('commented_post_id, public_user:public_user!comments_user_id_fkey(username), comment_content, created_at')
    
    const { data: { user } } = await supabase.auth.getUser();

    if (commentsError || likesError) {
        console.error("ERROR",commentsError, likesError);
    }
    if (!user) {
        return { redirectToLogin: true }; 
    }

    const postsWithDetails = await structurePostsData(posts, likes, comments);

    return {
        postsWithDetails,
        user,
    }
}

