import { useModal, useModalParams } from 'react-hook-modal-pure';
import { styled } from 'styled-components';
import useLogout from '../../Auth/Logout';
import useErrorHandler from '../../../custom/useErrorHandler';

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
  cursor: pointer;
`;

interface Props {
  useModalParams: useModalParams;
  objType: string;
  id: string;
}

const DeleteModal = ({ useModalParams, objType, id }: Props) => {
  const modalProps = useModal(useModalParams);
  const handleErrors = useErrorHandler();
  const { logout } = useLogout();

  const handleDelete = async () => {
    let res;
    if (objType === 'user') {
      res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/delete`, {
        method: 'PATCH',
        credentials: 'include',
      });
    } else {
      res = await fetch(`${import.meta.env.VITE_API_URL}/${objType}s/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    }

    if (!res.ok) {
      handleErrors(res);
      return;
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
