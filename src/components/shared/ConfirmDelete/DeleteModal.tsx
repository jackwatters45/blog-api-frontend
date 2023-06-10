import { useModal, useModalParams } from 'react-hook-modal-pure';
import { styled } from 'styled-components';
import useLogout from '../../Auth/Logout';

const StyledModal = styled.div`
  position: absolute;
  background: #dc2626;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 40px;
  width: 120px;
  ${({ theme }) => theme.shadow};
`;

interface Props {
  useModalParams: useModalParams;
  objType: string;
  id: string;
}

const DeleteModal = ({ useModalParams, objType, id }: Props) => {
  const modalProps = useModal(useModalParams);
  const { logout } = useLogout();

  const handleDelete = async () => {
    if (objType === 'user') {
      await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/delete`, {
        method: 'PATCH',
        credentials: 'include',
      });
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/${objType}s/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    }

    logout();

    window.location.reload();
  };

  return (
    <StyledModal {...modalProps} onClick={handleDelete}>
      <h4>Really Delete?</h4>
    </StyledModal>
  );
};

export default DeleteModal;
