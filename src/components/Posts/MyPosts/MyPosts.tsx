import { useEffect, useState } from 'react';
import IPost from '../../../../types/post';
import { useUserContext } from '../../../context/UserContext';
import EditPostsView from '../../shared/EditPostsView';
import Loading from '../../shared/Loading';

const MyPosts = () => {
  const { user } = useUserContext();

  const [myPosts, setMyPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?._id}/posts`);
      const data = await res.json();
      setMyPosts(data);
    };
    fetchMyPosts();
  }, [user]);

  return myPosts ? <EditPostsView posts={myPosts} title={'My Posts'} /> : <Loading />;
};

export default MyPosts;
