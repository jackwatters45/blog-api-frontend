import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';
import { styled } from 'styled-components';
import { Pagination, usePagination } from '../../custom/usePagination';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import Loading from '../shared/Loading';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const postsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(postsPerPage, postCount);

  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  useEffect(() => {
    const fetchPostsNew = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?limit=${postsPerPage}&offset=${offset}`,
      );
      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };
    fetchPostsNew();
  }, [offset]);

  return posts ? (
    <StyledMain>
      <PostsContainer>
        <Posts posts={posts} />
        <Pagination {...paginationProps} />
      </PostsContainer>
      <Sidebar />
    </StyledMain>
  ) : (
    <Loading />
  );
};

export default Dashboard;
