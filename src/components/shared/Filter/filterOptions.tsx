const commonPostFilterOptions = [
  { value: '', label: 'Any' },
  { value: 'title', label: 'Title' },
  { value: 'topic', label: 'Topic' },
];

export const PostFilterOptions = (isAdminView: boolean) => {
  return isAdminView
    ? [...commonPostFilterOptions, { value: 'author', label: 'Author' }]
    : commonPostFilterOptions;
};
