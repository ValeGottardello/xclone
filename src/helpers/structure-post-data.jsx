

export const postsWithDetails = (posts, comments, likes) => {
  const details = posts.map(post => {
        const postComments = comments.filter(comment => comment.commented_post_id === post.id);
        const postLikes = likes.filter(like => like.post_id === post.id);
      
        return {
          ...post,
          comments: postComments.map(comment => ({
            id: comment.id,
            content: comment.comment_content,
            public_user: {
              username: comment.public_user.username,
            },
          })),
          likes: postLikes.map(like => ({
            id: like.id,
            public_user: {
              username: like.public_user.username,
            },
          })),
        };
      });
  return details;
}
