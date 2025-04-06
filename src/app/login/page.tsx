import React from 'react';
import { AuthButtonServer } from '../components/auth-button-server';

export default function Login() {

    return (
        <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm text-gray-500">Login to your account</p>
            <div className="flex flex-col gap-4">
                <AuthButtonServer />
            </div>
        </section>
    )
}