
import React from 'react';
import Box from '@mui/material/Box';
import { PostLists } from './components/post-lists';
import { ComposePost } from './components/compose-post';
import SearchBar from './components/search-bar';
import { AuthButtonServer } from './components/auth-button-server';
import { getPosts } from './service/get-posts';
import { redirect } from "next/navigation";
import LateralLeftMenu from './components/lateral-left-menu';
import LateralRightMenu from './components/lateral-right-menu';

export default async function Home() {
  
  const { postsWithDetails, currentUser, redirectToLogin } = await getPosts();

  if (redirectToLogin) {
      redirect("/login");
  }
  return (
    <main className="flex min-h-scren flex-row items-start justify-around"
    >
      <div className="flex flex-col gap-10 pt-20">
        <AuthButtonServer currentUser={currentUser ?? null}/>
        <LateralLeftMenu currentUser={currentUser ?? null} />
      </div>
      <div className="flex min-h-scren flex-col items-center justify-between">
        <Box  
          sx={{
            maxWidth: '600px',
            minWidth: '600px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}
        >
          <ComposePost avatarURL={currentUser?.user_metadata?.avatar_url} />
          <PostLists 
            posts={postsWithDetails} 
            currentUser={currentUser ?? null}
            />
        </Box>
      </div>
      <div className="flex flex-col gap-10 pt-20">
          <SearchBar />
         <LateralRightMenu />
      </div>
      
    </main>
  );
}



