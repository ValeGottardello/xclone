import { useState } from "react";
import { Comment } from "../types/posts";
import Avatar from '@mui/joy/Avatar';
import { Box, Divider } from "@mui/material";

export default function CommentList({ commentsState } : { commentsState: Comment[] | [] }) {
    
    return (
        <>
        {commentsState.length > 0 ? (
            commentsState.map((comment : Comment) => (

                <Box key={comment.commented_post_id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'transparent',
                        width: '100%'}}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            position: 'relative',
                            top: 0,
                            bottom: 0,
                            // left: 40, 
                            left: 1, 
                            height: '100%!important',
                            width: '1px', 
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Color de la línea
                            transform: 'translateX(-50%)', // Ajusta para centrar la línea
                            zIndex: 0,
            
                        }}
                    />
                    <Avatar
                        src={comment.public_user.avatar_url || '/default-avatar.png'}
                        sx={{ 
                            width: '48px',  
                            height: '48px', 
                            borderRadius: '50%',
                            overflow: 'hidden',
                            objectFit: 'contain',
                        }}
                    />
                    
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">{comment.public_user.username}</span>
                        <span className="text-sm text-gray-500">{comment.comment_content}</span>
                    </div>
                </Box>
            ))
        ) : (
          <></>
        )}
        </>
    )
}