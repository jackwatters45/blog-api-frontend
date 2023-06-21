import { Link, useParams } from 'react-router-dom';
import { getTitleCase } from './formattingHelpers';
import { css, styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border};
`;

const OptionStyle = css`
  font-size: 0.8rem;
  margin-right: 2rem;
  padding-bottom: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const OptionLink = styled(Link)`
  ${OptionStyle}
`;

const Option = styled.p`
  ${OptionStyle}
`;

const SelectedOption = styled.p`
  ${OptionStyle}
  border-bottom: 1px solid ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

type SelectType = 'params' | 'state';

interface Props {
  options: string[];
  defaultOption: string;
  selectType: SelectType;
  selectedOption?: string;
  setSelectedOption?: (type: string) => void;
}

const MenuOptions = ({
  options,
  defaultOption,
  selectType,
  selectedOption,
  setSelectedOption,
}: Props) => {
  if (!options.includes(defaultOption)) {
    throw new Error('Default option must be included in options');
  }

  const { type } = useParams();

  if (selectType === 'params') {
    return (
      <Container>
        {options.map((option) => {
          const title = getTitleCase(option);
          return type === option || (type === undefined && option === defaultOption) ? (
            <SelectedOption key={option}>{title}</SelectedOption>
          ) : (
            <OptionLink key={option} to={option === defaultOption ? '' : option}>
              {title}
            </OptionLink>
          );
        })}
      </Container>
    );
  }

  const handleClick = (option: string) => {
    if (!setSelectedOption) throw new Error('setSelectedOption is not defined');
    setSelectedOption(option);
  };

  if (selectType === 'state') {
    return (
      <Container>
        {options.map((option) => {
          const title = getTitleCase(option);
          return selectedOption === option ? (
            <SelectedOption key={option}>{title}</SelectedOption>
          ) : (
            <Option key={option} onClick={() => handleClick(option)}>
              {title}
            </Option>
          );
        })}
      </Container>
    );
  }

  return null;
};

export default MenuOptions;
