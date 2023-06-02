import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import theme from '../../styles/styledComponents/theme';

const Container = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0rem;
    align-items: flex-start;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const SelectWrapper = styled.div`
  border-radius: 0.25rem;
  overflow: hidden;
  ${theme.shadow[0]}
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledSelect = styled.select`
  padding: 0.25rem;
  border: none;
  border-right: 0.5rem solid transparent;
`;

type Props = {
  label?: string;
  sortBy: string;
  handleSelectSortBy: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SortBy = ({ sortBy, handleSelectSortBy, label }: Props) => {
  return (
    <Container>
      <StyledLabel htmlFor="sortBy">{label ?? 'Sort By:'}</StyledLabel>
      <SelectWrapper>
        <StyledSelect
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={handleSelectSortBy}
        >
          <option value="totalPosts">Total Posts</option>
          <option value="totalLikes">Total Likes</option>
        </StyledSelect>
      </SelectWrapper>
    </Container>
  );
};

export default SortBy;
