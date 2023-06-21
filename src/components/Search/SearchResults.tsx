import { useEffect, useState } from 'react';
import Loading from '../shared/Loading';
import SearchResultsDisplay from './SearchResultsDisplay';
import { ISearchResults } from '../../../types/utils/search';
import useQuery from '../../custom/useQuery';
import useErrorHandler from '../../custom/useErrorHandler';

const SearchResults = () => {
  const handleErrors = useErrorHandler();

  const [searchResults, setSearchResults] = useState<ISearchResults | undefined>(
    undefined,
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const query = useQuery();
  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/search/all?q=${query}`);

      if (!res.ok) {
        handleErrors(res);
        return;
      }

      const data = await res.json();
      setSearchResults(data);
      setIsLoaded(true);
    };
    fetchSearchResults();
  }, [query, handleErrors]);

  return isLoaded ? (
    <SearchResultsDisplay searchResults={searchResults as ISearchResults} />
  ) : (
    <Loading />
  );
};

export default SearchResults;
