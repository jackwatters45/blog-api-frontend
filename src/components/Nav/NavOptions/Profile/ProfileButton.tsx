import { mdiAccount, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { styled } from 'styled-components';
import { useModalTrigger } from 'react-hook-modal-pure';
import ProfileDropdown from './ProfileDropdown';

const StyledProfileButton = styled.button`
  display: flex;
  align-items: center;
`;

const ProfileButton = () => {
  const { isModalVisible, buttonProps, useModalParams } = useModalTrigger();

  return (
    <div>
      <StyledProfileButton {...buttonProps}>
        <Icon path={mdiAccount} size={0.9} />
        <Icon path={mdiChevronDown} size={0.5} />
      </StyledProfileButton>
      {isModalVisible && <ProfileDropdown useModalParams={useModalParams} />}
    </div>
  );
};

export default ProfileButton;
