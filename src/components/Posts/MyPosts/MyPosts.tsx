import { useEffect, useState } from 'react';
import IPost from '../../../../types/post';
import { useUserContext } from '../../../context/UserContext';
import EditPostsView from '../../shared/EditPostsView';
import Loading from '../../shared/Loading';
import { usePagination } from '../../../custom/usePagination';

const MyPosts = () => {
  const { user } = useUserContext();

  const [postCount, setPostCount] = useState<number>(0);
  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  const [myPosts, setMyPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${
          user?._id
        }/posts?=limit=${itemsPerPage}&offset=${offset}`,
      );
      const {
        posts,
        meta: { total },
      } = await res.json();
      setMyPosts(posts);
      setPostCount(total);
    };
    fetchMyPosts();
  }, [user, offset]);

  return myPosts ? (
    <EditPostsView posts={myPosts} title={'My Posts'} paginationProps={paginationProps} />
  ) : (
    <Loading />
  );
};

export default MyPosts;
