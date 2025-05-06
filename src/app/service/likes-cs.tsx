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

