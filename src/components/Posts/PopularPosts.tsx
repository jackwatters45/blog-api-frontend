import {
  StyledContentContainer,
  StyledH1,
  StyledMain,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import Posts from './Posts';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import useSelect, {
  getItemsPerPageOptions,
  timeRangeOptions,
} from '../../custom/useSelect';
import { styled } from 'styled-components';
import { usePagination, Pagination } from '../../custom/usePagination';
import Loading from '../Shared/Loading';
import useErrorHandler from '../../custom/useErrorHandler';

const Selects = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularPosts = () => {
  const handleErrors = useErrorHandler();

  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

  const [timeRange, TimeRangeSelect] = useSelect('lastWeek');
  const [itemsPerPage, ItemsPerPageSelect] = useSelect('10');
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  useEffect(() => {
    const fetchPostsPopular = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts/popular?timeRange=${timeRange}&limit=${itemsPerPage}&offset=${offset}`,
      );

      if (!res.ok) {
        handleErrors(res);
        return;
      }

      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };
    fetchPostsPopular();
  }, [timeRange, itemsPerPage, offset, handleErrors]);

  return posts ? (
    <StyledMain>
      <StyledContentContainer>
        <StyledH1>Explore Popular Posts</StyledH1>
        <Selects>
          <TimeRangeSelect {...timeRangeOptions} />
          <ItemsPerPageSelect {...getItemsPerPageOptions('Post')} />
        </Selects>
        <PostsContainer>
          <Posts posts={posts} />
          <Pagination {...paginationProps} />
        </PostsContainer>
      </StyledContentContainer>
      <Sidebar />
    </StyledMain>
  ) : (
    <Loading />
  );
};

export default PopularPosts;
