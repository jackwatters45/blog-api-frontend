import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import { useUserContext } from '../../context/UserContext';
import useErrorHandler from '../../custom/useErrorHandler';
import Loading from '../Shared/Loading';
import { usePagination } from '../../custom/usePagination';
import EditPostsView from '../Shared/EditPostsView';

const SavedPosts = () => {
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();
  const [isFetched, setIsFetched] = useState(false);

  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

  const { offset, ...paginationProps } = usePagination('25', postCount);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = user?._id;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/saved-posts`,
          {
            credentials: 'include',
          },
        );

        if (!res.ok) {
          handleErrors(res);
          return;
        }
        const { savedPosts, savedPostsCount } = await res.json();
        setPosts(savedPosts);
        setPostCount(savedPostsCount);
        setIsFetched(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [user?._id, handleErrors]);

  return isFetched ? (
    <EditPostsView
      posts={posts as IPost[]}
      title={'Saved Posts'}
      isAdminView={false}
      paginationProps={paginationProps}
    />
  ) : (
    <Loading />
  );
};

export default SavedPosts;
