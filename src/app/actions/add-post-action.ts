'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';  

export const addPost = async (formData: FormData) => {
    'use server';
    const content = formData.get('content')
    
    if (typeof content !== 'string' || content.trim() === '' || content === null) {
        return; 
    }
    const supabase = await createClient();  
    const { data : { user }} = await supabase.auth.getUser();

    if(!user) return;        

    const { error } = await supabase.from('posts').insert({ content, user_id: user.id });
    if (error) {
        console.error(error);
        return;
    }
    revalidatePath('/'); //it revalidate from root page an render again all sc and for the cc keep all data that has no changes, and reconsilite wioth the data thgat has changed
}