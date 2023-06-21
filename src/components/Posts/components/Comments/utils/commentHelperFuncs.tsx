import IComment from '../../../../../../types/comment';

export const updateCommentsRecursively = (
  comments: IComment[],
  commentId: string,
  newCommentPopulated: IComment,
): IComment[] => {
  return comments.map((comment) => {
    if (comment._id === commentId) {
      // Update the comment with the new reply
      return { ...comment, replies: [newCommentPopulated, ...comment.replies] };
    } else if (comment.replies && comment.replies.length > 0) {
      // Recursively update replies
      return {
        ...comment,
        replies: updateCommentsRecursively(
          comment.replies,
          commentId,
          newCommentPopulated,
        ),
      };
    }
    return comment;
  });
};

export const sortCommentReplies = (sortBy: string, commentReplies: IComment[]) => {
  switch (sortBy) {
    case 'replies':
      return commentReplies?.sort((a, b) => b.replies?.length - a.replies?.length);
    case 'likes':
      return commentReplies?.sort((a, b) => b.likes.length - a.likes.length);
    case 'dislikes':
      return commentReplies?.sort((a, b) => b.dislikes.length - a.dislikes.length);
    default:
      return commentReplies?.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }
};
