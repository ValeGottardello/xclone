'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// import { type User} from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

import { FacebookIcon, GitHubIcon } from  './icons';
import { Container } from '@mui/material';
import { User as SupabaseAuthUser } from '@supabase/supabase-js';

// import { statusChangeCallback } from '@/utils/facebook-sdk';
type Props = {
    user: SupabaseAuthUser | null;
  };
export function AuthButton({ user }: Props){
    const supabase = createClient();
    const router = useRouter();
    console.log('user', user);
    const handleSignInGitHub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { 
                redirectTo: 'http://localhost:3000/auth/callback', 
            }
        });
    }
    const handleSignInFaceBook = async () => {


        // const response = await window.FB.getLoginStatus(function(response) {
        //     statusChangeCallback(response);
        // });
        // console.log(response);
        // if(response.status !== 'connected') {

        // } else {
        // }
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
            console.error(error);
        }
        router.refresh();
    }

   
    return (
        <>
            {
                !user ? (
                    <>
                    <Container className="flex flex-row gap-2">

                        {/* <fb:login-button 
                        scope="public_profile,email"
                        onlogin="checkLoginState();">
                        </fb:login-button> */}
                        <button 
                            onClick={handleSignInGitHub} 
                            type="button" 
                            className="cursor-pointer text-white bg-[#24292F]  s:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2">
                            <GitHubIcon className="w-4 h-4 me-2" />
                        </button>
                        <button data-share="true"
                                data-width="450"
                                data-show-faces="true"
                                onClick={handleSignInFaceBook} 
                                type="button" 
                                className="fb-like cursor-pointer text-white bg-[#24292F]  s:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2">
                            <FacebookIcon />
                        </button>
                    </Container>
                    </>
                ) : (
                    <Container className="flex flex-col gap-2">
                        <button onClick={handleSignOut} type="button" className="cursor-pointer text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                            Sign out
                        </button>
                    </Container>
                    
                )
            }
        </>
    )
}