import { Link, useParams } from 'react-router-dom';
import { getTitleCase } from '../../../utils/formattingHelpers';
import { css, styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  box-shadow: inset 0 -0.5px 0 ${({ theme }) => theme.colors.borderColor};
  margin-bottom: 1rem;
`;

const OptionStyle = css`
  font-size: 0.8rem;
  margin-right: 2rem;
  padding-bottom: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Option = styled(Link)`
  ${OptionStyle}
`;

const SelectedOption = styled.p`
  ${OptionStyle}
  border-bottom: 1px solid ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const activityOptions = ['all', 'posts', 'comments'];

const ActivityOptions = () => {
  const { type } = useParams();
  return (
    <Container>
      {activityOptions.map((option) => {
        const title = getTitleCase(option);
        return type === option || (type === undefined && option === 'all') ? (
          <SelectedOption key={option}>{title}</SelectedOption>
        ) : (
          <Option key={option} to={option === 'all' ? '' : option}>
            {title}
          </Option>
        );
      })}
    </Container>
  );
};

export default ActivityOptions;
