import { createClient } from "@/utils/supabase/client";

export async function removeLike(userId : string,  postId : string) {
    const supabase = await createClient();
    console.log(userId,postId)
    const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId)

    return {
        error
    };
}

export async function insertLike(userId : string ,  postId : string) {
    const supabase = await createClient();
    console.log(userId,postId)

    const { error } = await supabase.from('likes').insert({ user_id: userId, post_id: postId });
    
    return {
        error
    };
}

export async function fetchLikes(postId : string) {
    const supabase = await createClient();
    console.log(postId)

    const { data: likes, error: likesError } = await supabase.from('likes')
    .select(`
            id,
            post_id,
            user_id,
            public_user:public_user!likes_user_id_fkey (
                id,
                username,
                avatar_url
            )
            `)
    .eq('post_id', postId)
    
    return {
        likes,
        likesError
    };
}

