import { mdiAccount, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { styled } from 'styled-components';

const StyledProfileButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileDropdown = () => {
  return (
    <div>
      <StyledProfileButton>
        <Icon path={mdiAccount} size={0.9} />
        <Icon path={mdiChevronDown} size={0.5} />
      </StyledProfileButton>
      <div style={{ display: 'none' }}>dropdown here</div>
    </div>
  );
};

export default ProfileDropdown;
