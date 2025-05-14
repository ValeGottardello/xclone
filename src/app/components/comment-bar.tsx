import { User } from "@supabase/supabase-js";
import { ComposeComment } from "./compose-comment";

export function CommentBar ({ currentUser }: { currentUser: User | null }) {
    return (
        <div>
            <ComposeComment avatarURL={currentUser?.user_metadata.avatar_url || ''} />
        </div>
    )
}