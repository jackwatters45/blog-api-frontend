import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../../../context/UserContext';

const StyledForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 0;
  background: transparent;
  border: none;
  box-shadow: none;
`;

const StyledButton = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  border-left: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 0;
  padding: 0.5rem 1rem;
`;

type Props = {
  setComments: Dispatch<SetStateAction<IComment[] | undefined>>;
  postId: string;
};

const AddComment = ({ setComments, postId }: Props) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return navigate('/login');

    if (!comment.trim()) return;

    const newComment = {
      _id: 'tempId',
      content: comment,
      author: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      post: postId,
    } as IComment;

    setComments((prev) => [...(prev as IComment[]), newComment]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: comment, post: postId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        setComments((prev) => prev?.filter((comment) => comment._id !== 'tempId'));
        throw new Error('Could not add comment');
      }

      const realComment = await response.json();
      setComments((prev) =>
        prev?.map((comment) => (comment._id === 'temporary-id' ? realComment : comment)),
      );
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <StyledButton type="submit" value={'Respond'} />
    </StyledForm>
  );
};

export default AddComment;
