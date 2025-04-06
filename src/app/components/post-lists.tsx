
import React from 'react';
import { PostCard } from './posts-card';
import { type Post } from "../types/posts";

export function PostLists({ posts }: { posts: Post[] | null }) {

    return (
      <>
      
        {
          posts?.map((post) => {
            const {
              id,
               created_at: createdAt,
              content,
            } = post
            
            const {
              username,
              name, 
              avatar_url: avatarUrl,
            } = post.public_user;

            return (
              <PostCard
                key={id}
                createdAt={createdAt}
                userName={username}
                avatarUrl={avatarUrl}
                postContent={content}
                userFullName={name}
              />
            )
          })
        }
      </>
    )
}