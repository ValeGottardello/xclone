import React from 'react';
import { redirect } from 'next/navigation';
import { AuthButtonServer } from '../components/auth-button-server';
import LateralMenu from '../components/lateral-menu';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import SearchBar from '../components/search-bar';
import SideBar from '../components/sidebar';
import { getUserPosts } from '../service/getPosts';
import MyPostsComponent from '../components/my-posts';
import UserPostsComponent from '../components/my-posts';

export default async function MyProfile({ params }: { params: { id: string } }) {
    const userId = params.id || "";
    const { postsWithDetails, user, redirectToLogin } = await getUserPosts(userId);

    if (redirectToLogin) {
        redirect("/login");
    }
  
    return (
        <main className="flex min-h-scren flex-row items-start justify-around"
           >
             <div className="flex flex-col gap-10 pt-20">
               <AuthButtonServer user={user ?? null} />
               <LateralMenu />
             </div>
             <div 
             style={{
              borderLeft: '1px solid rgba(255, 255, 255, 0.2)', 
              borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '3rem',
              maxWidth: '600px',
              }}>
               <Box
                 sx={{
                   width: '100%',
                   minHeight: '25vh', 
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center', 
                   backgroundColor: '#CFD9DD',
                 }}
               >
                  <Avatar
                      src={user?.user_metadata?.picture ? user?.user_metadata?.picture : user?.user_metadata?.avatar_url}
                      alt={user?.user_metadata?.user_name}
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
                  posts={postsWithDetails} 
                  user={user}
                  />
             </div>
             <div className="flex flex-col gap-10 pt-20">
                 <SearchBar />
                 <SideBar />
             </div>
             
           </main>
    )
}

