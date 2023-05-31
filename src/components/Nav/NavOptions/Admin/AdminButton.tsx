import { mdiAccountHardHat, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { styled } from 'styled-components';
import { useModalTrigger } from 'react-hook-modal-pure';
import AdminDropdown from './AdminDropdown';

const StyledAdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p {
    font-size: 1rem;
  }
`;

const AdminButton = () => {
  const { isModalVisible, buttonProps, useModalParams } = useModalTrigger();

  return (
    <div>
      <StyledAdminButton {...buttonProps}>
        <Icon path={mdiAccountHardHat} size={0.9} />
        <p>Admin</p>
        <Icon path={mdiChevronDown} size={0.5} />
      </StyledAdminButton>
      {isModalVisible && <AdminDropdown useModalParams={useModalParams} />}
    </div>
  );
};

export default AdminButton;
