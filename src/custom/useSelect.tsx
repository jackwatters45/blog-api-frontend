import { ChangeEvent, FC, useState } from 'react';
import { styled } from 'styled-components';

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
  ${({ theme }) => theme.shadow};
  border: 0.5px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledSelect = styled.select`
  padding: 0.25rem;
  border: none;
  border-right: 0.5rem solid transparent;
`;

export interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  className?: string;
}

type UseSelectReturn = [string, FC<SelectProps>];

const useSelect = (initial: string): UseSelectReturn => {
  const [value, setValue] = useState(initial);
  const handleSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const Select = ({ id, label, options, className }: SelectProps) => {
    return (
      <Container className={className}>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <SelectWrapper>
          <StyledSelect name={id} id={id} value={value} onChange={handleSelectValue}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>
      </Container>
    );
  };

  return [value, Select];
};

export default useSelect;

// Time range select
export const timeRangeOptions = {
  id: 'timeRange',
  label: 'Time Range:',
  options: [
    { value: 'allTime', label: 'All Time' },
    { value: 'lastYear', label: 'This Year' },
    { value: 'lastMonth', label: 'This Month' },
    { value: 'lastWeek', label: 'This Week' },
    { value: 'lastDay', label: 'Today' },
  ],
};

export const getItemsPerPageOptions = (itemName: string) => {
  return {
    id: 'timeRange',
    label: `${itemName}s per Page:`,
    options: [
      { value: '10', label: '10' },
      { value: '25', label: '25' },
      { value: '50', label: '50' },
      { value: '100', label: '100' },
    ],
  };
};

export const getSortOptions = (itemName: string) => {
  return {
    id: 'sort',
    label: itemName !== '' ? `Sort ${itemName}s by:` : 'Sort by:',
    options: [
      { value: 'newest', label: 'Newest' },
      { value: 'likes', label: 'Most Likes' },
      { value: 'dislikes', label: 'Most Dislikes' },
      { value: 'replies', label: 'Most Replies' },
    ],
  };
};
