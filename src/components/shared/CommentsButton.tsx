import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
  }
`;

interface Props {
  commentsCount: number;
}

const CommentsButton = ({ commentsCount }: Props) => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const handleClickComment = async () => {
    if (!user) return navigate('/login');
    // navigate to comments section of post
  };

  return (
    <CommentButton onClick={handleClickComment}>
      <p>💬</p>
      <p>{commentsCount}</p>
    </CommentButton>
  );
};

export default CommentsButton;
