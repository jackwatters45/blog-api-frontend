import { useEffect, useMemo, useState } from 'react';
import IPost from '../../../types/post';
import EditPostsView from '../shared/EditPostsView';
import Loading from '../shared/Loading';
import { usePagination } from '../../custom/usePagination';
import useErrorHandler from '../Errors/useErrorHandler';

const EditPostsAdmin = () => {
  const handleResponse = useErrorHandler();
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);

  const postCount = useMemo(() => posts?.length ?? 0, [posts?.length]);
  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts/preview?limit=${itemsPerPage}&offset=${offset}`,
        {
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleResponse(res);
        return;
      }

      const { posts } = await res.json();
      setPosts(posts);
    };
    fetchPosts();
  }, [offset, handleResponse]);

  return posts ? (
    <EditPostsView
      posts={posts}
      title={'All Posts'}
      isAdminView={true}
      paginationProps={paginationProps}
    />
  ) : (
    <Loading />
  );
};

export default EditPostsAdmin;
