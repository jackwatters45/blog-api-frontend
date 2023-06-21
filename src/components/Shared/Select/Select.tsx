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
  ${({ theme }) => theme.shadow};
  border: 0.5px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledSelect = styled.select`
  padding: 0.25rem;
  border: none;
  border-right: 0.5rem solid transparent;
`;

interface Props {
  id: string;
  label: string;
  value: string;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const Select = ({ id, label, value, options, handleSelect, className }: Props) => {
  return (
    <Container className={className}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <SelectWrapper>
        <StyledSelect name={id} id={id} value={value} onChange={handleSelect}>
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

export default Select;
