import { styled } from 'styled-components';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
`;

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const SearchForm = ({ onSubmit, searchInput, setSearchInput, placeholder }: Props) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <input
        type="text"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        placeholder={placeholder ?? 'Search...'}
      />
      <input type="submit" value="Search" />
    </StyledForm>
  );
};

export default SearchForm;
