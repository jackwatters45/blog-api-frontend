import Nav from '../Nav/Nav';
import {
  StyledContentContainer,
  StyledH1,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import Posts from './Posts';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import TimeRange from './components/TimeRange';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 1rem 100px;
  margin: 0 auto;
  max-width: 1200px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
`;

// -> Add option to choose time

// gotta figure out when where to populate that
// implement filters etc

// same thing with authors (search by author)
const PopularPosts = () => {
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);

  useEffect(() => {
    const fetchPostsPopular = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/popular`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPostsPopular();
  }, []);

  return (
    <>
      <Nav />
      <StyledMain>
        <StyledContentContainer>
          <StyledH1>Explore Popular Posts</StyledH1>
          <TimeRange />
          <Posts postsProp={posts} selectedFilter={true} />
        </StyledContentContainer>
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default PopularPosts;
