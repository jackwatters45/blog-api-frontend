import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from 'react';
import useErrorHandler from './useErrorHandler';

type UseSearchSingleCategoryReturn<T> = [
  T[],
  string,
  Dispatch<SetStateAction<string>>,
  (e: FormEvent) => Promise<void>,
  boolean,
];

export const useSearchSingleCategory = <T,>(
  initial: T[],
  categoryToSearch: string,
): UseSearchSingleCategoryReturn<T> => {
  const handleErrors = useErrorHandler();
  const [filteredData, setFilteredData] = useState<T[]>(initial);

  const [searchInput, setSearchInput] = useState<string>('');
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const query = searchInput ? `?q=${searchInput.toLowerCase().trim()}` : '';
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/search/${categoryToSearch}${query}`,
      {
        credentials: 'include',
      },
    );

    if (!res.ok) {
      handleErrors(res);
      return;
    }

    const data = await res.json();
    setFilteredData(data);
  };

  const isFiltered = useMemo(() => {
    return filteredData?.length !== initial?.length;
  }, [filteredData?.length, initial?.length]);

  return [filteredData, searchInput, setSearchInput, onSubmit, isFiltered];
};
