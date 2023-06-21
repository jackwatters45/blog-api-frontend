import { ChangeEvent, FormEvent, useState } from 'react';
import IComment from '../../../../../types/comment';
import { useNavigate, useLocation } from 'react-router';
import { useUserContext } from '../../../../context/UserContext';
import useErrorHandler from '../../../../custom/useErrorHandler';
import {
  StyledButton,
  StyledForm,
  StyledInput,
} from '../../../../styles/styledComponents/Comment';
import { useParams } from 'react-router-dom';
import { useCommentsContext } from '../../../../context/CommentsContext';

const AddComment = () => {
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();
  const { id: postId } = useParams();

  const { setComments, setTotalComments, setTotalParentComments } = useCommentsContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return navigate('/login', { state: { from: pathname } });

    if (!comment.trim()) return;

    const author = {
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      avatarUrl: user.avatarUrl,
    };

    const newComment = {
      _id: 'tempId',
      content: comment,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      post: postId,
      likes: [],
      dislikes: [],
      isDeleted: false,
      replies: [],
      parentComment: null,
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
        handleErrors(res);
        setComments((prev) => prev?.filter((comment) => comment._id !== 'tempId'));
        throw new Error('Could not add comment');
      }

      const realComment = await res.json();

      setComments((prev) => {
        return prev?.map((comment) => {
          return comment._id === 'tempId' ? realComment : comment;
        });
      });
      setComment('');
      setTotalComments((prev) => prev + 1);
      setTotalParentComments((prev) => prev + 1);
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
