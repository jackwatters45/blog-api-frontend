import { ChangeEvent, useState } from 'react';

const useTimeRange = (initialRange = 'lastWeek') => {
  const [timeRange, setTimeRange] = useState<string>(initialRange);
  const handleSelectRange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  return { timeRange, handleSelectRange };
};

export default useTimeRange;
