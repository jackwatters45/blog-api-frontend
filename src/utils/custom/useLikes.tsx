import { useEffect, useState } from 'react';
import { isAlreadyLiked } from '../likesHelpers';
import IPost from '../../../types/post';
import IUser from '../../../types/user';

const useLikes = (post: IPost, user: IUser | null) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [hasUserLiked, setHasUserLiked] = useState<boolean>(false);

  useEffect(() => {
    const setupLikes = () => {
      if (!post) return;
      setLikesCount(post.likes?.length ?? 0);
      if (user) setHasUserLiked(isAlreadyLiked(post, user));
    };
    setupLikes();
  }, [post, user]);

  return { likesCount, hasUserLiked, setLikesCount, setHasUserLiked, post };
};

export default useLikes;
