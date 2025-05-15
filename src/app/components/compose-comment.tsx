'use client';
import React from "react";
import { Avatar } from "@mui/material";
import { ComposePostButton } from "./compose-post-button";
import { addComment, fetchComments } from "../service/comments-cs";

export function ComposeComment ({
    currentUserId,
    avatarURL, 
    postId,
    setCommentsState
} : {
    currentUserId: string | null,
    avatarURL: string,
    postId: string,
    setCommentsState: React.Dispatch<React.SetStateAction<any[] | []>>
}) {

    const formRef = React.useRef<HTMLFormElement>(null);
    return (
        <form ref={formRef} action={async(formData) => {
            if(!currentUserId) return;

            formData.append('currentUserId', currentUserId); 
            formData.append('postId', postId); 
            formData.append('content', formData.get('content') as string); 
            
            await addComment(formData)
            const { comments, commentsError } = await fetchComments(postId);
            if (commentsError) {
                console.error(commentsError);
                return;
            }
            if (comments) {
                setCommentsState(comments);
            }
            formRef.current?.reset();
        }} className="flex flex-row gap-y-4 p-4 w-full space-x-4 border-b border-white/20">
            <Avatar
              src={avatarURL  || '/default-avatar.png'}
              sx={{ 
                width: '48px',  
                height: '48px', 
                borderRadius: '50%',
                overflow: 'hidden',
                objectFit: 'contain',
              }}

            />
            <div className="flex flex-row gap-y-4 w-full align-items-stretch">
                <textarea  
                    name="content"
                    className="w-full text-l bg-black placeholder-gray-500 p-2"
                    placeholder="What's on your mind?"
                >
                </textarea>
                <ComposePostButton />
            </div>
        </form>
    )
}