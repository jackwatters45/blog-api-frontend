import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import PostForm from './PostForm';
import { useUserContext } from '../../../context/UserContext';
import Loading from '../../Shared/Loading';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const { pathname } = useLocation();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <Loading />;

  if (user?.userType !== 'admin' && user?._id !== post?.author._id)
    return <Navigate to={'/unauthorized'} state={{ from: pathname }} />;

  return <PostForm post={post} pageTitle={'Edit Post'} />;
};

export default EditPost;
