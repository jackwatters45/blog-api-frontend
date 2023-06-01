import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import EditPostsView from '../shared/EditPostsView';

const EditPostsAdmin = () => {
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/preview`, {
        credentials: 'include',
      });
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return posts ? (
    <EditPostsView posts={posts} title={'All Posts'} isAdminView={true} />
  ) : null;
};

export default EditPostsAdmin;
