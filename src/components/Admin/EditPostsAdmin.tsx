import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import EditPostsView from '../shared/EditPostsView';
import Loading from '../shared/Loading';
import { usePagination } from '../../custom/usePagination';

const EditPostsAdmin = () => {
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);

  const [postCount, setPostCount] = useState<number>(0);
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
      const {
        posts,
        meta: { total },
      } = await res.json();
      setPostCount(total);
      setPosts(posts);
    };
    fetchPosts();
  }, [offset]);

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
