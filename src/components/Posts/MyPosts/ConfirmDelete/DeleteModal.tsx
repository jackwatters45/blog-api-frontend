import { useModal, useModalParams } from 'react-hook-modal-pure';
import { styled } from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  background: #dc2626;
  padding: 0.25rem 0.5rem;
  margin-left: -0.75rem;
  border-radius: 4px;
  ${({ theme }) => theme.shadow};
`;

type Props = {
  useModalParams: useModalParams;
  objType: string;
  id: string;
};

const DeleteModal = ({ useModalParams, objType, id }: Props) => {
  const modalProps = useModal(useModalParams);

  const handleDelete = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/${objType}s/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    window.location.reload();
  };

  return (
    <StyledModal {...modalProps} onClick={handleDelete}>
      <h4>Really Delete?</h4>
    </StyledModal>
  );
};

export default DeleteModal;
