import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

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
  ${(props) => props.theme.shadow};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledSelect = styled.select`
  padding: 0.25rem;
  border: none;
  border-right: 0.5rem solid transparent;
`;

type Props = {
  timeRange: string;
  handleSelectRange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const TimeRange = ({ timeRange, handleSelectRange }: Props) => {
  return (
    <Container>
      <StyledLabel htmlFor="timeRange">Time Range:</StyledLabel>
      <SelectWrapper>
        <StyledSelect
          name="timeRange"
          id="timeRange"
          value={timeRange}
          onChange={handleSelectRange}
        >
          <option value="allTime">All Time</option>
          <option value="lastYear">This Year</option>
          <option value="lastMonth">This Month</option>
          <option value="lastWeek">This Week</option>
          <option value="lastDay">Today</option>
        </StyledSelect>
      </SelectWrapper>
    </Container>
  );
};

export default TimeRange;
