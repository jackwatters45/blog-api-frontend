import { useEffect, useState } from 'react';
import Loading from '../shared/Loading';
import SearchResultsDisplay from './SearchResultsDisplay';
import { ISearchResults } from '../../../types/utils/search';
import useQuery from '../../custom/useQuery';

const SearchResults = () => {
  const query = useQuery();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<ISearchResults | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/search/all?q=${query}`);
      const data = await res.json();
      setSearchResults(data);
      setIsLoaded(true);
    };
    fetchSearchResults();
  }, [query]);

  return isLoaded ? (
    <SearchResultsDisplay searchResults={searchResults as ISearchResults} />
  ) : (
    <Loading />
  );
};

export default SearchResults;
