import { ChangeEvent } from 'react';
import Select from './Select';

interface Props {
  itemName: string;
  itemsPerPage: string;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ItemsPerPageSelect = ({ itemName, itemsPerPage, handleSelect }: Props) => {
  return (
    <Select
      id="timeRange"
      label={`${itemName}s per Page:`}
      value={itemsPerPage}
      handleSelect={handleSelect}
      options={[
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
      ]}
    />
  );
};

export default ItemsPerPageSelect;
