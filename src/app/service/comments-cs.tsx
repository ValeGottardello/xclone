import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";

export async function fetchComments(postId : string) {
    const supabase = await createClient();
    console.log(postId)

    const { data: comments, error: commentsError } = await supabase.from('comments')
    .select(`
            id,
            comment_content,
            created_at,
            commented_post_id,
            comment_user_id,
            public_user:public_user!comments_user_id_fkey (
                id,
                username,
                avatar_url
            )
            `)
    .eq('commented_post_id', postId)
    
    return {
        comments,
        commentsError
    };
}

export const addComment = async (formData: FormData) => {
    const content = formData.get('content') as string | null;
    const postId = formData.get('postId') as string | null;
    const currentUserId = formData.get('currentUserId') as string | null;
    
    if (typeof content !== 'string' || content.trim() === '' || content === null) {
        return; 
    }
    if (typeof postId !== 'string' || postId.trim() === '' || postId === null) {
        return; 
    }
    if (content.length > 255) {
        return;
    }
    if (currentUserId === null) {
        return;
    }
    const supabase = await createClient();  
    const { error } = await supabase.from('comments').insert({ 
        comment_content: content, 
        commented_post_id: postId, 
        comment_user_id: currentUserId  
    });
    
    if (error) {
        console.error(error);
        return;
    }
}