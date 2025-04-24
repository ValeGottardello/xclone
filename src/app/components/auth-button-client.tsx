'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

import { FacebookIcon, GitHubIcon } from  './icons';
import { Container } from '@mui/material';
import { type AuthButtonProps } from '../types/posts';


export function AuthButton({ user } : AuthButtonProps){
    const supabase = createClient();
    const router = useRouter();

    const handleSignInGitHub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { 
                redirectTo: 'http://localhost:3000/auth/callback', 
            }
        });
    }
    const handleSignInFaceBook = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: { 
                redirectTo: 'http://localhost:3000/auth/callback', 
            }
        })  
    }

    const handleSignOut = async () => {
        const error = await supabase.auth.signOut()
        if (error) {
            console.log(error);
        }
        router.refresh();
        router.push('/login');
    }

   
    return (
        <>
            {
                !user ? (
                    <>
                    <Container className="flex flex-row gap-2">

                        <button 
                            onClick={handleSignInGitHub} 
                            type="button" 
                            className="cursor-pointer text-white bg-[#24292F] h-[2.9rem] s:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2">
                            <GitHubIcon className="w-4 h-[3rem] me-2" />
                        </button>
                        <button data-share="true"
                                data-width="450"
                                data-show-faces="true"
                                onClick={handleSignInFaceBook} 
                                type="button" 
                                className="fb-like h-[2.9rem] cursor-pointer text-white bg-[#24292F]  s:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2">
                            <FacebookIcon />
                        </button>
                    </Container>
                    </>
                ) : (
                    <Container className="flex flex-col gap-2">
                        <button onClick={handleSignOut} type="button" className="h-[2.9rem] w-[100%] cursor-pointer text-white bg-transparent border-white/30 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium border-[0.01px] rounded-[22px] text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                            Sign out
                        </button>
                    </Container>
                    
                )
            }
        </>
    )
}