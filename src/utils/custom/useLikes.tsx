import { useEffect, useState } from 'react';
import { ILike } from '../../../types/post';

const isAlreadyLiked = (likes: ILike[], currentUserId: string) => {
  if (!likes) throw new Error('Post like array does not exist');
  return likes.some(({ userId }) => userId === currentUserId);
};

const useLikes = (likes: ILike[], userId: string | undefined) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [hasUserLiked, setHasUserLiked] = useState<boolean>(false);

  useEffect(() => {
    const setupLikes = () => {
      setLikesCount(likes?.length ?? 0);
      if (userId) setHasUserLiked(isAlreadyLiked(likes, userId));
    };
    setupLikes();
  }, [likes, userId]);

  return { likesCount, hasUserLiked, setLikesCount, setHasUserLiked };
};

export default useLikes;
