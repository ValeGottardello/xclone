'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { type User} from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

import { GitHubIcon } from  './icons';



export function AuthButton({ user }: { user: User | null }) {
    const supabase = createClient();
    const router = useRouter();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { 
                redirectTo: 'http://localhost:3000/auth/callback', 
            }
        });
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
                    <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F]  s:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2">
                         <GitHubIcon className="w-4 h-4 me-2" />
                        Sign in with Github
                    </button>
                ) : (
                    <button onClick={handleSignOut} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                        <GitHubIcon className="w-4 h-4 me-2" />
                        Sign out
                    </button>
                )
            }
        </>
    )
}