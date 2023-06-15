import { useEffect, useState } from 'react';
import IUser from '../../../../types/user';
import IComment from '../../../../types/comment';
import IPost from '../../../../types/post';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/Loading';
import { styled } from 'styled-components';
import Activity from '../ActivityColumn/Activity';
import AboutDeleted from './AboutDeleted';
import useErrorHandler from '../../Errors/useErrorHandler';

const StyledUserContainer = styled.main`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;

  max-width: 1200px;
  width: 100%;
  padding: 3rem 75px;
  margin: 0 auto;
  gap: 75px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
    flex-direction: column;
  }
`;

interface UserDetails {
  user: IUser;
  comments: IComment[];
  posts: IPost[] | string[];
}

const ViewDeletedUser = () => {
  const { id } = useParams();
  const handleError = useErrorHandler();

  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/deleted`, {
        credentials: 'include',
      });

      if (!res.ok) {
        handleError(res);
        return;
      }

      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [handleError, id]);

  if (!user) return <Loading />;

  const { user: userInfo, comments, posts } = user;

  const { firstName, lastName } = userInfo;

  return (
    <StyledUserContainer>
      <AboutDeleted user={userInfo} />
      <Activity comments={comments} posts={posts} name={`${firstName} ${lastName}`} />
    </StyledUserContainer>
  );
};

export default ViewDeletedUser;
