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
import { Like, Comment } from "../types/posts";
import { Modal } from "@mui/material";
import { ModalClose, Sheet } from "@mui/joy";
import { CommentBar } from "./comment-bar";


export function PostCard({ 
    postId,
    createdAt,
    userName, 
    userId,
    avatarUrl,
    postContent,
    userFullName,
    likes,
    comments,
    currentUser,
} : {
    postId: string;
    createdAt: string;
    userName: string;
    userId: string;
    avatarUrl: string;
    postContent: string;
    userFullName: string;
    likes: Like[];
    comments: Comment[];
    currentUser: User | null;
}) {  

  const [timeAgo, setTimeAgo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const createdAtDate = new Date(createdAt);
    const melbourneDate = toZonedTime(createdAtDate, 'Australia/Melbourne');
    setTimeAgo(formatDistanceToNow(melbourneDate, { addSuffix: true }));
  }, [createdAt]);


  const [isExpanded, setIsExpanded] = useState(false); 
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  }

  const handleComment = () => {
    // console.log('handleComment');
    console.log('open', open);
    setOpen(!open);
  }

  return (
    <>
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
            href={`/profile?user_id=${userId}`}
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
        <Link href={`/profile?user_id=${userId}`} sx={{ textDecoration: 'none' }}>
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
      <ReactionControls postId={postId} likes={likes} comments={comments}  currentUser={currentUser ?? null}   handleComment={handleComment}/>
    </Card>
   {/* Modal */}
    {open && (
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: 'md', boxShadow: 'lg' , backgroundColor: '#000' }}
        >
        <ModalClose variant="plain" sx={{ m: 1 }} />
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
                    href={`/profile?user_id=${userId}`}
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
                <Link href={`/profile?user_id=${userId}`} sx={{ textDecoration: 'none' }}>
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
              </CardContent>
              <CommentBar currentUser={currentUser ?? null} />
        </Card> 
        </Sheet>
    </Modal>
    )}
    {/* End Modal */}
    </>
  );
}

