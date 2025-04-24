
import React from 'react';
import { PostCard } from './posts-card';
import { type Post } from "../types/posts";
import { User } from '@supabase/supabase-js';

export function PostLists({ posts, user }: { posts: Post[], user: User | undefined }) {

    return (
      <>
      
        {
          posts?.map((post) => {
            // console.log(post)

            const {
              id,
              created_at: createdAt,
              content
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
                likes={post.likes}
                comments={post.comments}
                user={user ?? null}
              />
            )
          })
        }
      </>
    )
}