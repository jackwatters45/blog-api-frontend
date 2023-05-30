import { useEffect, useState } from 'react';
import IPost from '../../../../types/post';
import { useUserContext } from '../../../context/UserContext';
import Nav from '../../Nav/Nav';
import { StyledMain } from '../../../styles/styledComponents/HelperComponents';
import EditPostCard from './MyPostsCard';
import { styled } from 'styled-components';

const MyPostsMain = styled(StyledMain)`
  max-width: 1250px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MyPosts = () => {
  const { user } = useUserContext();

  const [myPosts, setMyPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    const fetchMyPosts = async () => {
      console.log(user);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?._id}/posts`);

      console.log(`${import.meta.env.VITE_API_URL}/posts/${user?._id}`);
      const data = await res.json();
      setMyPosts(data);
    };
    fetchMyPosts();
  }, [user]);

  return (
    <>
      <Nav />
      <MyPostsMain>
        <Container>
          <h1>My Posts</h1>
          <StyledPosts>
            {myPosts?.length ? (
              myPosts.map((post: IPost) => {
                return <EditPostCard key={post._id} post={post} />;
              })
            ) : (
              <div>{`No posts here yet..`}</div>
            )}
          </StyledPosts>
        </Container>
      </MyPostsMain>
    </>
  );
};

export default MyPosts;
