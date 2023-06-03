import Icon from '@mdi/react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

interface Props {
  icon?: string;
  text?: string;
  to: string;
  size?: number;
}

const StyledNavOption = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const NavOption = ({ icon, text, size, to }: Props) => {
  return (
    <NavLink to={to}>
      <StyledNavOption>
        {icon && <Icon path={icon} size={size ?? 0.9} />}
        {text && <p>{text}</p>}
      </StyledNavOption>
    </NavLink>
  );
};

export default NavOption;
