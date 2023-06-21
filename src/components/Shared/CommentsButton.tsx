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
  postId: string;
}

const CommentsButton = ({ commentsCount, postId }: Props) => {
  const navigate = useNavigate();

  const handleClickComment = async () => {
    navigate(`/post/${postId}`, { state: { scrollToComments: true } });
  };

  return (
    <CommentButton onClick={handleClickComment}>
      <p>💬</p>
      <p>{commentsCount}</p>
    </CommentButton>
  );
};

export default CommentsButton;
