import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { styled } from 'styled-components';

const StyledForm = styled.form`
  display: flex;
`;

const SelectWrapper = styled.div`
  border-radius: 0.25rem 0 0 0.25rem;
  width: 100px;
  overflow: hidden;
`;

const StyledSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border-right: 0.5rem solid transparent;
  height: 100%;
  width: 100%;
`;

const StyledInput = styled.input`
  border-radius: 0;
  width: 100%;
  border-radius: 0 0.25rem 0.25rem 0;
`;

interface filterOption {
  value: string;
  label: string;
}

type Props<T> = {
  data: T[];
  setFilteredData: Dispatch<SetStateAction<T[]>>;
  filterFunction: (filter: string, data: T[], filterType?: string) => T[];
  filterOptions?: filterOption[];
  placeHolder: string;
};

const Filter = <T,>({
  data,
  setFilteredData,
  filterFunction,
  filterOptions,
  placeHolder,
}: Props<T>) => {
  const [filter, setFilter] = useState<string>('');
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const [filterType, setFilterType] = useState<string>('any');
  const handleFilterTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  useEffect(() => {
    if (filter === '') return setFilteredData(data);
    return setFilteredData(filterFunction(filter, data, filterType));
  }, [filter, filterType, setFilteredData, filterFunction, data]);

  return (
    <StyledForm>
      {filterOptions && (
        <SelectWrapper>
          <StyledSelect
            name="filterType"
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            {filterOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>
      )}
      <StyledInput
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder={placeHolder}
      />
    </StyledForm>
  );
};

export default Filter;
