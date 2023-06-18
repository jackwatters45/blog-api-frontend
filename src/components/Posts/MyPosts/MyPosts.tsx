import { useEffect, useMemo, useState } from 'react';
import IPost from '../../../../types/post';
import { useUserContext } from '../../../context/UserContext';
import EditPostsView from '../../shared/EditPostsView';
import Loading from '../../shared/Loading';
import { usePagination } from '../../../custom/usePagination';

const MyPosts = () => {
  const { user } = useUserContext();

  const [myPosts, setMyPosts] = useState<undefined | IPost[]>(undefined);
  const postCount = useMemo(() => {
    return myPosts?.length ?? 0;
  }, [myPosts]);

  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  useEffect(() => {
    if (!user) return;
    const fetchMyPosts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${
          user._id
        }/posts?limit=${itemsPerPage}&offset=${offset}`,
      );
      const { posts } = await res.json();
      setMyPosts(posts);
    };
    fetchMyPosts();
  }, [user, offset]);

  return myPosts ? (
    <EditPostsView
      posts={myPosts}
      title={'My Posts'}
      paginationProps={paginationProps}
      isAdminView={false}
    />
  ) : (
    <Loading />
  );
};

export default MyPosts;
