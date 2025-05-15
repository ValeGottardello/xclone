'use client';
import CommentList from "./comment-list";
import { ComposePost } from "./compose-post";
import { Comment } from "../types/posts";
import { User } from '@supabase/supabase-js';
import { useState } from "react";
import { ComposeComment } from "./compose-comment";

export default function Comments({ comments, currentUser, postId } : { comments: Comment[], currentUser: User | null, postId: string }) {
    const [commentsState, setCommentsState] = useState<Comment[] | []>(comments);

    return (
        <>
        <CommentList
            commentsState={commentsState}
        />
        <ComposeComment
            currentUserId={currentUser?.id || ''}
            avatarURL={currentUser?.user_metadata.avatar_url || '/default-avatar.png'} 
            postId={postId}
            setCommentsState={setCommentsState}
        />
        </>
    )
}
