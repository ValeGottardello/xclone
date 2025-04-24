'use client';
import React from "react";
import { useState, useEffect } from 'react';

import ReactionControls from './reaction-controls';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import Link from '@mui/joy/Link';
import Typography from '@mui/material/Typography';


import { formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { User } from "@supabase/supabase-js";


export function PostCard({ 
    postId,
    createdAt,
    userName, 
    avatarUrl,
    postContent,
    userFullName,
    likes,
    comments,
    user,
} : {
    postId: string;
    createdAt: string;
    userName: string;
    avatarUrl: string;
    postContent: string;
    userFullName: string;
    likes: Array<{ userId: string; postId: string }>;
    comments: Array<{ userId: string; postId: string; commentContent: string; createdAt: string }>;
    user: User | null;
}) {  

  const [timeAgo, setTimeAgo] = useState<string | null>(null);

  useEffect(() => {
    const createdAtDate = new Date(createdAt);
    const melbourneDate = toZonedTime(createdAtDate, 'Australia/Melbourne');
    setTimeAgo(formatDistanceToNow(melbourneDate, { addSuffix: true }));
  }, [createdAt]);


  const [isExpanded, setIsExpanded] = useState(false); 
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card
    sx={{
      backgroundColor: 'transparent', 
      border: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      '&:hover': {
        backgroundColor: '#919fb61b', 
      },
      transition: 'all 0.2s ease-in-out', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0px', 
      cursor: 'pointer',
      width: '100%', 
    }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            objectFit: 'cover',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
            },
          }}
        >
          <Link
            href={`/profile/${userName}`}
            sx={{
              display: 'block',
              position: 'relative',
              zIndex: 1,
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >  
            <Avatar
              src={avatarUrl}
              alt={userName}
              variant="soft"
              sx={{ 
                width: '48px',  
                height: '48px', 
                borderRadius: '50%',
                overflow: 'hidden',
                objectFit: 'contain',
              }}

            />
          </Link>
        </Box>
        <Typography sx={{ fontWeight: 'lg', color: '#fff' }}>{userFullName}</Typography>
      </CardContent>
      <CardContent>
        <Link href={`/profile/${userName}`} sx={{ textDecoration: 'none' }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: '#fff', fontSize: '0.75rem'}}
          >
            @{userName}
          </Typography>
        </Link>
        <Typography 
           sx={{
            color: '#fff',
            fontSize: '0.875rem', 
            lineHeight: '1.5', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'none' : 2, 
            WebkitBoxOrient: 'vertical', 
          }}
        >
          {postContent}
        </Typography>
        <Link
          component="button"
          underline="none"
          startDecorator="…"
          onClick={handleReadMore} 
          className="read-more-btn"
          sx={{ fontSize: 'sm', color: '#0ea5e9', justifyContent: 'flex-end' }}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Link>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5, justifyContent: 'flex-end' }}
        >
          <span>{timeAgo ?? '...'}</span>
        </Link>
      </CardContent>
      <ReactionControls postId={postId} likes={likes} comments={comments}  user={user ?? null}/>
    </Card>
  );
}
