// 'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { AuthButtonServer } from './components/auth-button-server';
import Box from '@mui/material/Box';
import { PostLists } from './components/post-lists';
import { ComposePost } from './components/compose-post';

// import { NavMenu } from './components/NavMenu';

export default async function Home() {
  const supabase  = await createClient();
  const { data: posts } = await supabase
                                      .from("posts")
                                      .select("*, public_user(name, username, avatar_url)")
                                      .order('created_at', { ascending : false });
  const {data: { user }} = await supabase.auth.getUser();
  if (!user) {
    redirect("/login"); 
  }
  return (
    <main className="flex min-h-scren flex-col items-center justify-between "
    >
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
        <PostLists posts={posts} />
      </Box>
      <AuthButtonServer />
      
    </main>
  );
}
