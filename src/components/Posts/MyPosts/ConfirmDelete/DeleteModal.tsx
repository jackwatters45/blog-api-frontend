import { useModal, useModalParams } from 'react-hook-modal-pure';
import { styled } from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  background: #dc2626;
  padding: 0.5rem;
  border-radius: 4px;
  ${({ theme }) => theme.shadow};
`;

type Props = {
  useModalParams: useModalParams;
  postId: string;
};

const DeleteModal = ({ useModalParams, postId }: Props) => {
  const modalProps = useModal(useModalParams);

  const handleDelete = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    window.location.reload();
  };

  return (
    <StyledModal {...modalProps} onClick={handleDelete}>
      <h3>Really Delete?</h3>
    </StyledModal>
  );
};

export default DeleteModal;
