
import React from 'react';
import Box from '@mui/material/Box';
import { PostLists } from './components/post-lists';
import { ComposePost } from './components/compose-post';
import SideBar from './components/sidebar';
import LateralMenu from './components/lateral-menu';
import SearchBar from './components/search-bar';
import { AuthButtonServer } from './components/auth-button-server';
import { getPosts } from './service/getPosts';
import { redirect } from "next/navigation";

export default async function Home() {
  
  const { postsWithDetails, user, redirectToLogin } = await getPosts();

  if (redirectToLogin) {
      redirect("/login");
  }
  return (
    <main className="flex min-h-scren flex-row items-start justify-around"
    >
      <div className="flex flex-col gap-10 pt-20">
        <AuthButtonServer user={user ?? null}/>
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
            user={user}
            posts={postsWithDetails} 
            />
        </Box>
      </div>
      <div className="flex flex-col gap-10 pt-20">
          <SearchBar />
          <SideBar />
      </div>
      
    </main>
  );
}



