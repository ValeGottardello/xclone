
import React from 'react';
import { PostCard } from './posts-card';
import { PostComponentProps } from "../types/posts";
import { User } from '@supabase/supabase-js';

export function PostLists({ posts, currentUser }: PostComponentProps) {

    return (
      <>
      
        {
          posts?.map((post) => {
            const {
              id,
              created_at: createdAt,
              content,
              user_id: userId,
            } = post
              
            const {
              username,
              name, 
              avatar_url: avatarUrl,
            } = post.public_user;
            
                
            
            return (
              <PostCard
                key={id}
                postId={id}
                createdAt={createdAt}
                userName={username}
                avatarUrl={avatarUrl}
                postContent={content}
                userFullName={name}
                userId={userId}
                likes={post.likes}
                comments={post.comments}
                currentUser={currentUser ?? null}
              />
            )
          })
        }
      </>
    )
}