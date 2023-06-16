import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import useErrorHandler from '../../Errors/useErrorHandler';
import SavePostButton from './SavePostButton';

interface Props {
  postId?: string;
}

const SavePost = ({ postId }: Props) => {
  const { id } = useParams();
  const handleError = useErrorHandler();

  const { user } = useUserContext();
  const savedPosts = user?.savedPosts;

  const [isSaved, setIsSaved] = useState(false);
  const handleClick = () => {
    const savePost = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/saved-posts/${id ?? postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleError(res);
        return;
      }

      setIsSaved((prev) => !prev);
    };
    savePost();
  };

  useEffect(() => {
    console.log(savedPosts);
    console.log(postId);
    setIsSaved(
      savedPosts?.some((post) => {
        return post === id || post === postId;
      }) ?? false,
    );
  }, [savedPosts, id, postId, isSaved]);

  return <SavePostButton onClick={handleClick} isSaved={isSaved} />;
};

export default SavePost;
