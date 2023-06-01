const commonPostFilterOptions = [
  { value: '', label: 'Any' },
  { value: 'title', label: 'Title' },
  { value: 'topic', label: 'Topic' },
];

export const getPostFilterOptions = (isAdminView: boolean) => {
  return isAdminView
    ? [...commonPostFilterOptions, { value: 'author', label: 'Author' }]
    : commonPostFilterOptions;
};

export const userFilterOptions = [
  { value: '', label: 'Any' },
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'username', label: 'Username' },
];
