export const formatErrors = (errorsString: string) => {
  if (!errorsString.includes(';')) return <li>{errorsString}</li>;
  return errorsString.split(';').map((error, index) => {
    return <li key={index}>{error}</li>;
  });
};

export const passwordRequirements = [
  'Password must be at least 8 characters long.',
  'Password must contain at least one uppercase letter.',
  'Password must contain at least one lowercase letter.',
  'Password must contain at least one digit.',
  'Password must contain at least one special character (@, $, !, %, *, ?, &).',
];
