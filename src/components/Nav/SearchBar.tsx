import { styled } from 'styled-components';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBarWrapper = styled.form`
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;
  padding: 0.5rem;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = searchTerm.trim().toLowerCase();
    if (search === '') return;

    navigate(`/search?q=${search}`);
  };

  return (
    <SearchBarWrapper onSubmit={handleSubmit}>
      <SearchIcon>
        <Icon path={mdiMagnify} size={0.75} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        maxLength={50}
      />
      <input type="submit" hidden />
    </SearchBarWrapper>
  );
};

export default SearchBar;
