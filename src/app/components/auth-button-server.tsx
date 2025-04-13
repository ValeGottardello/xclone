import React from "react";
import { createClient } from "@/utils/supabase/server";
import { AuthButton } from "./auth-button-client";


export async function AuthButtonServer() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return (
        <AuthButton user={data.user}/>
    );
} 