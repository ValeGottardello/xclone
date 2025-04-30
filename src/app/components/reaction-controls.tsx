'use client'
import React, { useEffect, useState }  from "react";
import { CardContent, Container, Link, Typography } from "@mui/joy";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { IconRepeat } from "@tabler/icons-react";
import { ReactionControlsProps } from '../types/posts'; 
import { createClient } from '@/utils/supabase/client';


export default function ReactionControls({ postId, likes, comments, currentUser} : ReactionControlsProps) {
    const [isLiked, setIsLiked] = useState(false);
    const supabase = createClient();

    useEffect(() => {
      console.log('likes', likes);
      console.log('isLiked', isLiked);
        if (currentUser?.id) {
          const isLiked = likes.some((like) => like.public_user.id === currentUser.id);
          setIsLiked(isLiked);
        }
    }, [currentUser, likes]);


    const handleLike = async () => {
        const userId =  currentUser?.id; 
        if (!userId) {
            console.log('User not authenticated');
            return;
        }

        try {
          const { error } = await supabase.from('likes').insert({ user_id: currentUser.id, post_id: postId });
          if (error) {
              console.error(error);
              return;
          }
          setIsLiked(isLiked);
        } catch (error) {
          console.error('Error liking post:', error);
        } 
    }


    return (
        <>
        <CardContent 
          orientation="horizontal" sx={{ gap: 1, flex: 1, justifyContent: 'flex-end' }}>
          <Container
            disableGutters
            maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0 }}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconRepeat stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              11
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0 }}>
            {!isLiked ? (
              <Link sx={{ width: '1.2rem', color: '#fff' }} onClick={handleLike}>
                <IconHeart stroke={2}/>
              </Link>
            ) : (
              <Link sx={{ width: '1.2rem', color: '#fff'}}>
                <IconHeartFilled stroke={2}/>
              </Link>
            )}
            <Typography sx={{ fontSize: '0.75rem' }}>
              {likes.length}
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0}}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconMessageCircle stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {comments.length}
            </Typography>
          </Container>
        </CardContent>
        </>
    )
}