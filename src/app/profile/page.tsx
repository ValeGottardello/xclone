// 'use client'
import React from 'react';
import { redirect } from 'next/navigation';
import { AuthButtonServer } from '../components/auth-button-server';
import LateralMenu from '../components/lateral-left-menu';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import SearchBar from '../components/search-bar';
import SideBar from '../components/lateral-right-menu';
import { getUserPosts } from '../service/posts-ss';
import MyPostsComponent from '../components/my-posts';
import UserPostsComponent from '../components/my-posts';
import LateralLeftMenu from '../components/lateral-left-menu';
import LateralRightMenu from '../components/lateral-right-menu';
import { ComposePost } from '../components/compose-post';
import { createClient } from '@/utils/supabase/server';

export default async function UserProfile({ searchParams }: { searchParams: { user_id: string } }) {
    const profileUserId = await searchParams?.user_id || "";
    let { postsWithDetails, currentUser , redirectToLogin } = await getUserPosts({ profileUserId });

    if (redirectToLogin) {
        redirect("/login");
    }
  
    return (
        <main className="flex min-h-scren flex-row items-start justify-around"
           >
             <div className="flex flex-col gap-10 pt-20">
               <AuthButtonServer currentUser={currentUser ?? null} />
               <LateralLeftMenu currentUser={currentUser ?? null} />
             </div>
             <div 
             style={{
              borderLeft: '1px solid rgba(255, 255, 255, 0.2)', 
              borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
              minHeight: '100vh',
              maxWidth: '600px',
              minWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: 'space-between',
              gap: '3rem',
              }}>
               <Box
                 sx={{
                   width: '100%',
                   minHeight: '25vh', 
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center', 
                  //  backgroundImage: postsWithDetails[0]?.public_user?.avatar_url
                  //  ? `url(${postsWithDetails[0]?.public_user?.avatar_url})`
                  //  : 'none',                  
                  //  backgroundColor: postsWithDetails[0]?.public_user?.avatar_url
                  //    ? 'transparent'
                  //    : '#1a202c', 
                  backgroundColor: '#1a202c', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                 }}
               >
                  <Avatar
                      src={postsWithDetails[0]?.public_user?.avatar_url}
                      alt={postsWithDetails[0]?.public_user?.username}
                      sx={{ 
                        position: 'absolute',
                        top: '18%',
                        left: '32%',
                        width: '100px',  
                        height: '100px', 
                        borderRadius: '50%',
                        overflow: 'hidden',
                        objectFit: 'contain',
                      }}

                    />
               </Box>
               <UserPostsComponent 
                  currentUser={currentUser}
                  posts={postsWithDetails} 
                  />
             </div> 
             <div className="flex flex-col gap-10 pt-20">
                 <SearchBar />
                 <LateralRightMenu />
             </div>
             
           </main>
    )
}

// type PostWithDetails = {
//   content: string;
//   created_at: string;
//   id: string;
//   user_id: string;
// } & {
//   public_user: UserType;
//   likes: Likes[];
//   comments: Comments[];
// }
// //type UserType = {
//   avatar_url: string;
//   created_at: string;
//   id: string;
//   name: string;
//   username: string;
// }
// type Likes = {
//   id: number;
//   post_id: string;
//   user_id: string;
//   public_user: {
//       id: string;
//       username: string;
//       avatar_url: string;
//   };
// }
// type Comments = {
//   commented_post_id: string;
//   comment_content: string;
//   created_at: string | null;
//   public_user: {
//       id: string;
//       username: string;
//       avatar_url: string;
//   };
// }