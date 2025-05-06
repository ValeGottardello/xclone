'use client'
import React, { useEffect, useState }  from "react";
import { CardContent, Container, Link, Typography } from "@mui/joy";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { IconRepeat } from "@tabler/icons-react";
import { ReactionControlsProps } from '../types/posts'; 
import { insertLike, removeLike } from "../service/likes-cs";


export default function ReactionControls({ postId, likes, comments, currentUser} : ReactionControlsProps) {
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);

    useEffect(() => {
        if (currentUser?.id) {
          const isLiked = likes.some((like) => like.public_user.id === currentUser.id);
          setIsLikedByCurrentUser(isLiked);
        }
    }, [currentUser, likes]);


    const handleLike = async () => {

      console.log('handleLike', isLikedByCurrentUser);
        const userId =  currentUser?.id; 
        if (!userId) return;

        if (isLikedByCurrentUser) {
          try {
            const { error } = await removeLike(userId, postId)
            if (error) {
                console.error(error);
                return;
            }
            setIsLikedByCurrentUser(false);
          } catch (error) {
            console.error('Error liking post:', error);
          } 
        } else {
          try {
            const { error } = await insertLike(userId, postId)
            if (error) {
                console.error(error);
                return;
            }
            setIsLikedByCurrentUser(true);
          } catch (error) {
            console.error('Error liking post:', error);
          } 
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
              <Link sx={{ width: '1.2rem', color: '#fff' }} onClick={handleLike}>
              {!isLikedByCurrentUser ?  <IconHeart stroke={2}/> : <IconHeartFilled stroke={2}/>}
              </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {likes ? likes.length : 0}
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0}}>
            <Link sx={{ width: '1.2rem', color: '#fff' }}>
              <IconMessageCircle stroke={2}/>
            </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {comments ? comments.length : 0}
            </Typography>
          </Container>
        </CardContent>
        </>
    )
}