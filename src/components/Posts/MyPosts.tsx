import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import { useUserContext } from '../../context/UserContext';
import EditPostsView from '../Shared/EditPostsView';
import Loading from '../Shared/Loading';
import { usePagination } from '../../custom/usePagination';
import useErrorHandler from '../../custom/useErrorHandler';

const MyPosts = () => {
  const { user } = useUserContext();
  const handleErrors = useErrorHandler();

  const [myPosts, setMyPosts] = useState<undefined | IPost[]>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

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

      if (!res.ok) {
        handleErrors(res);
        return;
      }
      const {
        posts,
        meta: { total },
      } = await res.json();
      setMyPosts(posts);
      setPostCount(total);
    };
    fetchMyPosts();
  }, [user, offset, handleErrors]);

  return myPosts ? (
    <EditPostsView
      posts={myPosts}
      title={'My Posts'}
      paginationProps={paginationProps}
      isAdminView={true}
    />
  ) : (
    <Loading />
  );
};

export default MyPosts;
