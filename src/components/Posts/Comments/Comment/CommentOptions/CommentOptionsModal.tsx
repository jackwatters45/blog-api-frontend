import { useModal, useModalParams } from 'react-hook-modal-pure';
import useErrorHandler from '../../../../../custom/useErrorHandler';
import { styled } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useCommentsContext } from '../../../../../context/CommentsContext';

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 10vw;
  align-items: flex-start;

  & > button {
    width: 100%;
    text-align: left;
  }
`;

interface Props {
  useModalParams: useModalParams;
  commentId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const CommentOptionsModal = ({ useModalParams, commentId, setIsEditing }: Props) => {
  const { closeModal } = useModalParams;
  const modalProps = useModal(useModalParams);
  const { id: postId } = useParams();
  const handleErrors = useErrorHandler();
  const { setComments } = useCommentsContext();

  const handleClickEditComment = () => {
    setIsEditing(true);
    closeModal();
  };

  const handleDeleteComment = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      handleErrors(response);
      return;
    }

    const { updatedComment } = await response.json();
    setComments((prevComments) =>
      prevComments?.map((comment) => {
        return comment._id === commentId ? { ...comment, ...updatedComment } : comment;
      }),
    );
  };

  return (
    <StyledModal {...modalProps}>
      <button onClick={handleClickEditComment}>Edit Comment</button>
      <button onClick={handleDeleteComment}>Delete Comment</button>
    </StyledModal>
  );
};

export default CommentOptionsModal;
