import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../../../context/UserContext';
import useErrorHandler from '../../../Errors/useErrorHandler';

const StyledForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: 1rem 0.5rem;
  border-radius: 0.25rem;
  border: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledInput = styled.input`
  box-shadow: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: none;
`;

const StyledButton = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  border-left: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0;
  padding: 0.5rem 1rem;
`;

interface Props {
  setComments: Dispatch<SetStateAction<IComment[] | undefined>>;
  postId: string;
}

const AddComment = ({ setComments, postId }: Props) => {
  const handleError = useErrorHandler();
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ content: comment }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleError(res);
        setComments((prev) => prev?.filter((comment) => comment._id !== 'tempId'));
        throw new Error('Could not add comment');
      }

      const realComment = await res.json();
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
