import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import CreatePost from './CreatePost';

// cgm
// reorganize file structure
// commits
// basic admin stuff

// tomorrow
// vet
// quest
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

  // TODO loading
  if (!post) return null;
  return <CreatePost post={post} />;
};

export default EditPost;
