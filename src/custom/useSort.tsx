import { ChangeEvent, useState } from 'react';

const sortByOptions = ['totalPosts', 'totalLikes'];

const sortDirectionOptions = ['1', '-1'];

const useSort = (initialBy = 'totalLikes', initialDirection = -1) => {
  const [sortBy, setSortBy] = useState(initialBy);

  const handleSelectSortBy = (sortBy: ChangeEvent<HTMLSelectElement>) => {
    if (!sortByOptions.includes(sortBy.target.value))
      throw new Error('Invalid sortBy option');
    setSortBy(sortBy.target.value);
  };

  const [sortDirection, setSortDirection] = useState(initialDirection);
  const handleSelectSortDirection = (sortDirection: ChangeEvent<HTMLSelectElement>) => {
    if (!sortDirectionOptions.includes(sortDirection.target.value))
      throw new Error('Invalid sortDirection option');
    setSortDirection(parseInt(sortDirection.target.value));
  };

  return {
    sortBy,
    sortDirection,
    handleSelectSortBy,
    handleSelectSortDirection,
  };
};

export default useSort;
