import { useEffect, useState } from 'react';
import IComment from '../../../types/comment';

// if comments put users comments at the top (with different background)
const isAlreadyCommented = (comments: IComment[], userId: string) => {
  if (!comments) throw new Error('Post comment array does not exist');
  return comments.some((comment) => (comment as IComment).author === userId);
};

const useComments = (comments: IComment[], userId: string | undefined) => {
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [hasUserCommented, setHasUserCommented] = useState<boolean>(false);

  useEffect(() => {
    const setupComments = () => {
      setCommentsCount(comments?.length ?? 0);
      if (userId) setHasUserCommented(isAlreadyCommented(comments, userId));
    };
    setupComments();
  }, [userId, comments]);

  return {
    commentsCount,
    hasUserCommented,
    setCommentsCount,
    setHasUserCommented,
    comments,
  };
};

export default useComments;
