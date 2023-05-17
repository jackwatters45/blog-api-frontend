import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

type Props = {
  icon?: string;
  text?: string;
  to: string;
  size?: number;
};

const StyledNavOption = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const NavOption = ({ icon, text, size, to }: Props) => {
  return (
    <Link to={to}>
      <StyledNavOption>
        {icon && <Icon path={icon} size={size ?? 0.9} />}
        {text && <p>{text}</p>}
      </StyledNavOption>
    </Link>
  );
};

export default NavOption;
