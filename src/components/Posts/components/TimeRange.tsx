import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import theme from '../../../styles/styledComponents/theme';

const Container = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  padding: 0.25rem 0.5rem;
  border: none;
  border-right: 0.5rem solid transparent;
`;

const TimeRange = () => {
  const [timeRange, setTimeRange] = useState<string>('lastWeek');
  const handleSelectRange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  console.log(theme);

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
