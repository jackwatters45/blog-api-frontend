import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import useErrorHandler from '../../../custom/useErrorHandler';
import SavePostButton from './SavePostButton';

interface Props {
  postId?: string;
}

const SavePost = ({ postId }: Props) => {
  const { id } = useParams();
  const handleErrors = useErrorHandler();

  const { user } = useUserContext();
  const savedPosts = user?.savedPosts;

  const [isSaved, setIsSaved] = useState(false);
  const handleClick = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/saved-posts/${id ?? postId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
    );

    if (!res.ok) {
      handleErrors(res);
      return;
    }

    setIsSaved((prev) => !prev);
  };

  useEffect(() => {
    setIsSaved(
      savedPosts?.some((post) => {
        return post === id || post === postId;
      }) ?? false,
    );
  }, [savedPosts, id, postId, isSaved]);

  return <SavePostButton onClick={handleClick} isSaved={isSaved} />;
};

export default SavePost;
