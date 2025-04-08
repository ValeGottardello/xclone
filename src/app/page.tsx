
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { AuthButtonServer } from './components/auth-button-server';
import Box from '@mui/material/Box';
import { PostLists } from './components/post-lists';
import { ComposePost } from './components/compose-post';
import { postsWithDetails as structurePostsData } from '../helpers/structure-post-data'; 
import SideBar from './components/sidebar';
import LateralMenu from './components/lateral-menu';

export default async function Home() {
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
  
  const {data: { user }} = await supabase.auth.getUser();

  if (commentsError || likesError) {
    console.error("ERROR",commentsError, likesError);
  }

  if (!user) {
    redirect("/login"); 
  }

  const postsWithDetails = await structurePostsData(posts, likes, comments);

  return (
    <main className="flex min-h-scren flex-row items-start justify-around"
    >
      <div className="flex pt-24">
        <LateralMenu />
      </div>
      <div className="flex min-h-scren flex-col items-center justify-between">
        <Box  
          sx={{
            maxWidth: '600px',
            width: '100%',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}
        >
          <ComposePost avatarURL={user?.user_metadata?.avatar_url} />
          <PostLists 
            posts={postsWithDetails} 
            />
          <AuthButtonServer />
        </Box>
      </div>
      <div className="flex pt-24">
          <SideBar />
      </div>
      
    </main>
  );
}



