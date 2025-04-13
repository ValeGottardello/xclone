'use client'
import React, { useReducer, useState, useEffect}  from "react";
import { CardContent, Container, Link, Typography } from "@mui/joy";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { IconRepeat } from "@tabler/icons-react";
import { ReactionControlsProps } from '../types/posts'; 
// import { init } from "next/dist/compiled/webpack/webpack";
// import { type Database } from '../types/database';
// import { type State, type Action } from '../types/actions';
import { createClient } from '@/utils/supabase/client';
import { Action, State } from "../types/actions";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const reducer = (state: State, action : Action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, success: false, error: null };
    case "SUCCESS":
      return { ...state, loading: false, success: true };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function ReactionControls({ postId, likes, comments } : ReactionControlsProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
      });

       // if user is not a use ron like object
      const userId = user?.id;
      if (userId) {
        const isLiked = likes.some((like) => like.userId === userId);
        dispatch({ type: "SUCCESS", payload: { isLiked } });
      }
    }, [user, likes]);

    const handleLike = async () => {
        const userId =  user?.id; 
        if (!userId) {
            console.log('User not authenticated');
            return;
        }
       
        dispatch({ type: "LOADING" });
        try {
          const { error } = await supabase.from('likes').insert({ user_id: user.id, post_id: postId });
          if (error) {
              console.error(error);
              dispatch({ type: "ERROR", payload: "Something went wrong please try again" });
              return;
          }
          dispatch({ type: "SUCCESS", payload: { isLiked: true } });
        } catch (error) {
          console.error('Error liking post:', error);
          dispatch({ type: "ERROR", payload: "Something went wrong please try again" });
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
            {/* { state.} */}
            <Link sx={{ width: '1.2rem', color: '#fff' }} onClick={handleLike}>
              <IconHeart stroke={2}/>
            </Link>
            <Link sx={{ width: '1.2rem', color: '#fff', display: 'none' }}>
              <IconHeartFilled stroke={2}/>
            </Link>
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