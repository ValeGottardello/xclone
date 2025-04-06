'use client'
import React from "react";
import { useFormStatus } from "react-dom";


export function ComposePostButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit" className="text-white bg-sky-500 font-bold rounded-full disable:opacity-40 disable:pointer-event-none px-5 py-2 self-end s:ring-[#24292F]/50 text-sm text-center hover:bg-sky-950 focus:ring-4 focus:outline-none focus:ring-bg-sky-950 me-2 mb-2 cursor-pointer">
            {pending ? 'Posting...' : 'Post'}
        </button>
    )
} 