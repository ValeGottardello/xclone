import { redirect } from "next/navigation";
import { getPostDetails } from "../service/posts-ss";
import { AuthButtonServer } from "../components/auth-button-server";
import LateralLeftMenu from "../components/lateral-left-menu";
import { Box } from "@mui/material";
import { ComposePost } from "../components/compose-post";
import SearchBar from "../components/search-bar";
import LateralRightMenu from "../components/lateral-right-menu";
import { PostCard } from "../components/posts-card";
import CommentList from "../components/comment-list";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Comments from "../components/comments";

export default async function PostDetails({ searchParams }: { searchParams: { post_id: string }}) {
        
    const postId = searchParams?.post_id || "";
    const { postWithDetails, currentUser, redirectToLogin } = await getPostDetails({ postId });

    if (redirectToLogin) {
        redirect("/login");
    }

    if (!postWithDetails) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-scren flex-row items-start justify-around"
        >
          <div className="flex flex-col gap-10 pt-20">
            <AuthButtonServer currentUser={currentUser ?? null}/>
            <LateralLeftMenu currentUser={currentUser ?? null} />
          </div>
          <div className="flex min-h-scren flex-col items-center justify-between">
            <Box  
              sx={{
                maxWidth: '600px',
                minWidth: '600px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
                minHeight: '100vh', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
              }}
            >   
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '50px', 
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        gap: '1rem',
                        padding: '1rem',
                    }}
                >
                    <Link href={`/`}>
                        <ArrowBackIcon/>
                    </Link>
                    <h4 className="font-bold text-white">Post</h4>
                </Box>
                <PostCard
                    key={postWithDetails.id}
                    postId={postWithDetails.id}
                    createdAt={postWithDetails.created_at}
                    userName={postWithDetails.public_user.username}
                    avatarUrl={postWithDetails.public_user.avatar_url}
                    postContent={postWithDetails.content}
                    userId={postWithDetails.user_id}
                    userFullName={postWithDetails.public_user.name}
                    likes={postWithDetails.likes}
                    comments={postWithDetails.comments}
                    currentUser={currentUser ?? null}
                />
               <Comments comments={postWithDetails.comments} currentUser={currentUser ?? null} postId={postWithDetails.id}/>
            </Box>
          </div>
          <div className="flex flex-col gap-10 pt-20">
              <SearchBar />
             <LateralRightMenu />
          </div>
          
        </main>
    );
}