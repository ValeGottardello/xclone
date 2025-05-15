import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
    const supabase = await createClient();

    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
            id,
            content,
            created_at,
            user_id,

            public_user:public_user!posts_user_id_fkey1 (
                id,
                created_at,
                username,
                name,
                avatar_url
            ),

            likes (
                id,
                post_id,
                user_id,
                public_user:public_user!likes_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            ),

            comments (
                commented_post_id,
                comment_content,
                created_at,
                public_user:public_user!comments_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            )

        `)
        .order('created_at', { ascending: false });

    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (postsError) {
        console.error(postsError);
        return { postsWithDetails: [], currentUser, redirectToLogin: true };
    }
    console.log("posts", posts);

    return {
        postsWithDetails : posts,
        currentUser,
        redirectToLogin: false,
    };
}

export async function getUserPosts({ profileUserId }: { profileUserId: string }) {
    const supabase = await createClient();

    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
            id,
            content,
            created_at,
            user_id,

            public_user:public_user!posts_user_id_fkey1 (
                id,
                created_at,
                username,
                name,
                avatar_url
            ),

            likes (
                id,
                post_id,
                user_id,
                public_user:public_user!likes_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            ),

            comments (
                commented_post_id,
                comment_content,
                created_at,
                public_user:public_user!comments_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            )

        `)
        .eq('user_id', profileUserId)
        .order('created_at', { ascending: false });

    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (postsError) {
        console.error(postsError);
        return { postsWithDetails: [], currentUser, redirectToLogin: true };
    }
    console.log("posts", posts);

    return {
        postsWithDetails : posts,
        currentUser,
        redirectToLogin: false,
    };
}

export async function getPostDetails({ postId }: { postId: string }) {
    const supabase = await createClient();

    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`
            id,
            content,
            created_at,
            user_id,

            public_user:public_user!posts_user_id_fkey1 (
                id,
                created_at,
                username,
                name,
                avatar_url
            ),

            likes (
                id,
                post_id,
                user_id,
                public_user:public_user!likes_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            ),

            comments (
                commented_post_id,
                comment_content,
                created_at,
                public_user:public_user!comments_user_id_fkey (
                    id,
                    username,
                    avatar_url
                )
            )

        `)
        .eq('id', postId)
        .single();

    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (postError) {
        console.error(postError);
        return { postWithDetails: null, currentUser, redirectToLogin: true };
    }
    console.log("post", post);

    return {
        postWithDetails : post,
        currentUser,
        redirectToLogin: false,
    };
}