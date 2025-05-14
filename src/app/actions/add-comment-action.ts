'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';  

export const addComment = async (formData: FormData) => {
    'use server';
    const content = formData.get('content')
    const postId = formData.get('postId')
    
    if (typeof content !== 'string' || content.trim() === '' || content === null) {
        return; 
    }
    if (typeof postId !== 'string' || postId.trim() === '' || postId === null) {
        return; 
    }
    const supabase = await createClient();  
    const { data : { user }} = await supabase.auth.getUser();

    if(!user) return;        

    const { error } = await supabase.from('comments').insert({ comment_content: content, commented_post_id : postId, comment_user_id: user.id });
    if (error) {
        console.error(error);
        return;
    }
    revalidatePath('/'); //it revalidate from root page an render again all sc and for the cc keep all data that has no changes, and reconsilite wioth the data thgat has changed
}