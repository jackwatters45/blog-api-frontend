import { useModal, useModalParams } from 'react-hook-modal-pure';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 3px;
  padding: 4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  font-size: 0.9rem;
  margin-top: 4px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledLi = styled.li`
  padding: 4px;
  border-radius: 3px;
  ${({ theme }) => theme.hoverStyle};
  cursor: pointer;
`;

interface Props {
  useModalParams: useModalParams;
}

const AdminDropdown = ({ useModalParams }: Props) => {
  const modalProps = useModal(useModalParams);

  return (
    <Container {...modalProps}>
      <ul>
        <Link to={`/admin/topics`}>
          <StyledLi>View Topics</StyledLi>
        </Link>
        <Link to={`/admin/users`}>
          <StyledLi>View Users</StyledLi>
        </Link>
        <Link to={`/admin/posts`}>
          <StyledLi>View Posts</StyledLi>
        </Link>
      </ul>
    </Container>
  );
};

export default AdminDropdown;
