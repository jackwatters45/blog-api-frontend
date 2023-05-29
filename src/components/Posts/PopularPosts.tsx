import Nav from '../Nav/Nav';
import {
  StyledContentContainer,
  StyledH1,
  StyledMain,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import Posts from './Posts';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import TimeRange from '../shared/TimeRange';
import useTimeRange from '../../custom/useTimeRange';

const PopularPosts = () => {
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);

  const { timeRange, handleSelectRange } = useTimeRange();

  useEffect(() => {
    const fetchPostsPopular = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/popular?timeRange=${timeRange}`,
      );
      const data = await res.json();
      setPosts(data);
    };
    fetchPostsPopular();
  }, [timeRange]);

  return (
    <>
      <Nav />
      <StyledMain>
        <StyledContentContainer>
          <StyledH1>Explore Popular Posts</StyledH1>
          <TimeRange timeRange={timeRange} handleSelectRange={handleSelectRange} />
          <Posts postsProp={posts} selectedFilter={true} />
        </StyledContentContainer>
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default PopularPosts;
