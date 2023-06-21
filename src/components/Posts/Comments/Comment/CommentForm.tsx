/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
  StyledAddForm,
  StyledAddInput,
  StyledButton,
} from '../../../../styles/styledComponents/Comment';
import useErrorHandler from '../../../../custom/useErrorHandler';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../../context/UserContext';
import { useCommentsContext } from '../../../../context/CommentsContext';
import { updateCommentsRecursively } from '../utils/commentHelperFuncs';

interface Props {
  commentId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
  initialComment?: string;
}

const CommentForm = ({
  commentId,
  setIsEditing,
  setIsReplying,
  initialComment,
}: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { user } = useUserContext();
  const { setComments, setTotalComments } = useCommentsContext();

  const [commentContent, setCommentContent] = useState(initialComment ?? '');
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const handleErrors = useErrorHandler();
  const [formError, setFormError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return navigate('/login', { state: { from: pathname } });

    if (!commentContent.trim()) return;

    const editComment = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content: commentContent }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleErrors(res);
        setFormError('Could not edit comment');
      }

      setComments((prev) => {
        return prev?.map((comment) => {
          return comment._id === commentId
            ? { ...comment, content: commentContent }
            : comment;
        });
      });
      setIsEditing(false);
    };
    if (initialComment) editComment();

    const replyToComment = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}/reply`,
        {
          method: 'POST',
          body: JSON.stringify({ content: commentContent }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleErrors(res);
        setFormError('Could not reply to comment');
      }

      const { newComment } = await res.json();
      const newCommentPopulated = {
        ...newComment,
        author: {
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
          avatarUrl: user.avatarUrl,
        },
        updatedAt: new Date().toISOString(),
      };

      setComments((prev) => {
        return updateCommentsRecursively(prev, commentId, newCommentPopulated);
      });
      setTotalComments((prev) => prev + 1);
      setIsReplying(false);
    };
    if (!initialComment) replyToComment();
  };

  return (
    <>
      <StyledAddForm onSubmit={handleSubmit}>
        <StyledAddInput
          type="text"
          placeholder="Edit your comment..."
          value={commentContent}
          onChange={handleCommentChange}
          autoFocus
        />
        <StyledButton type="submit" value={initialComment ? 'Save Comment' : 'Reply'} />
      </StyledAddForm>
      {formError && <p>{formError}</p>}
    </>
  );
};

export default CommentForm;
