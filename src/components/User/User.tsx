import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IUser from '../../../types/user.d';
import { styled } from 'styled-components';

const StyledUserContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Users/${id}`);
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return null;

  return <StyledUserContainer></StyledUserContainer>;
};

export default User;
