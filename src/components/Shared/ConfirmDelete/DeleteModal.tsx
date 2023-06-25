import { useModal, useModalParams } from 'react-hook-modal-pure';
import { styled } from 'styled-components';
import useLogout from '../../../custom/useLogout';
import useErrorHandler from '../../../custom/useErrorHandler';
import { useUserContext } from '../../../context/UserContext';

const StyledModal = styled.div`
  position: absolute;
  background: #dc2626;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 2rem;
  ${({ theme }) => theme.shadow};
  cursor: pointer;
  display: inline-block;
`;

const StyledH4 = styled.h4`
  color: white;
  white-space: nowrap;
  padding: 0 0.5rem;
`;

interface Props {
  useModalParams: useModalParams;
  objType: string;
  id: string;
}

const DeleteModal = ({ useModalParams, objType, id }: Props) => {
  const { ref } = useModal(useModalParams);
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();
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

    if (objType === 'user' && user?._id === id) logout();

    window.location.reload();
  };

  return (
    <StyledModal ref={ref} onClick={handleDelete}>
      <StyledH4>Really Delete?</StyledH4>
    </StyledModal>
  );
};

export default DeleteModal;
