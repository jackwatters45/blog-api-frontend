import Icon from '@mdi/react';
import { styled } from 'styled-components';

type Props = {
  icon: string;
  text: string;
  size?: number;
};

const StyledNavOption = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const NavOption = ({ icon, text, size }: Props) => {
  return (
    <StyledNavOption>
      <Icon path={icon} size={size ?? 1} />
      <p>{text}</p>
    </StyledNavOption>
  );
};

export default NavOption;
