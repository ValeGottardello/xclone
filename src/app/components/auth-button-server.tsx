import React from "react";
import { AuthButton } from "./auth-button-client";
import { type AuthButtonProps } from "../types/posts";

export async function AuthButtonServer({ currentUser }: AuthButtonProps) {

    return (
        <AuthButton currentUser={currentUser ?? null}/>
    );
} 