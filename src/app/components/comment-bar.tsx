import { User } from "@supabase/supabase-js";
import { ComposeComment } from "./compose-comment";

export function CommentBar ({ currentUser, postId }: { currentUser: User | null, postId: string }) {
    return (
        <div>
            <ComposeComment currentUserId={currentUser?.id ?? null} avatarURL={currentUser?.user_metadata.avatar_url || ''} postId={postId} />
        </div>
    )
}