'use client'
import React, { useEffect, useState }  from "react";
import { CardContent, Container, Link, Typography } from "@mui/joy";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { Like } from '../types/posts'; 
import { fetchLikes, insertLike, removeLike } from "../service/likes-cs";
import { User as SupabaseAuthUser } from '@supabase/supabase-js';

export type ReactionControlsProps = {
    postId: string;
    likes: Like[];
    comments: Comment[];
    currentUser: SupabaseAuthUser | null;
    handleComment: () => void;
}
export default function ReactionControls({ postId, likes, comments, currentUser, handleComment} : ReactionControlsProps) {
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
    const [likesState, setLikesState] = useState<Like[] | undefined>(likes);

    useEffect(() => {
        if (currentUser?.id) {
          const isLiked = likes.some((like) => like.public_user.id === currentUser.id);
          setIsLikedByCurrentUser(isLiked);
        }

        console.log(likesState)
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
            const { likes, likesError} = await fetchLikes(postId)

            if(likesError) {
              //TODO handle SETERROR
              return;
            }
            const mappedLikes = likes?.map(like => ({
              ...like,
              public_user: Array.isArray(like.public_user) ? like.public_user[0] : like.public_user
            }));
            setLikesState(mappedLikes);
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
            const { likes, likesError} = await fetchLikes(postId)

            if(likesError) {
              //TODO handle SETERROR
              return;
            }
            const mappedLikes = likes?.map(like => ({
              ...like,
              public_user: Array.isArray(like.public_user) ? like.public_user[0] : like.public_user
            }));
            setLikesState(mappedLikes);
          } catch (error) {
            console.error('Error liking post:', error);
          } 
        }
        console.log(likesState)

    }
    return (
        <>
        <CardContent 
          orientation="horizontal" sx={{ gap: 1, flex: 1, justifyContent: 'flex-end' }}>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0 }}>
              <Link sx={{ width: '1.2rem', color: '#fff' }} onClick={handleLike}>
              {!isLikedByCurrentUser ?  <IconHeart stroke={2}/> : <IconHeartFilled stroke={2}/>}
              </Link>
            <Typography sx={{ fontSize: '0.75rem' }}>
              {likesState ? likesState.length : 0}
            </Typography>
          </Container>
          <Container disableGutters maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 'auto', margin: 0}}>
            <Link sx={{ width: '1.2rem', color: '#fff' }} onClick={handleComment}>
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