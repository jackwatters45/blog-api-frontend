import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import PostForm from './PostForm';

const EditPost = () => {
  const { id } = useParams();

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

  return post ? <PostForm post={post} pageTitle={'Edit Post'} /> : null;
};

export default EditPost;
