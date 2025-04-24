import React from "react";
import { AuthButton } from "./auth-button-client";
import { type AuthButtonProps } from "../types/posts";

export async function AuthButtonServer({ user }: AuthButtonProps) {

    return (
        <AuthButton user={user ?? null}/>
    );
} 