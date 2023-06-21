import { arrToString } from './formHelpers';

function checkValidationErrorsEmail(email: string) {
  const errors = [];

  // Check if email is present
  if (!email) {
    errors.push('Email is required.');
  }

  // Check for '@'
  if (email && email.indexOf('@') === -1) {
    errors.push('Email must contain @ symbol.');
  }

  // Check for at least one character before and after '@'
  const [localPart, domainPart] = email.split('@');
  if (email && (!localPart || !domainPart)) {
    errors.push('Email must contain at least one character before and after @.');
  }

  // Check for at least two characters after '.'
  if (email && domainPart && domainPart.indexOf('.') === -1) {
    errors.push('Email must contain . (dot) in the domain part.');
  } else {
    const domainParts = domainPart.split('.');
    if (domainParts[domainParts.length - 1].length < 2) {
      errors.push('Email must contain at least two characters after . (dot).');
    }
  }

  return errors.length ? errors : true;
}

export const validateEmailHooks = (email: string) => {
  const errors = checkValidationErrorsEmail(email);
  return errors === true ? true : arrToString(errors);
};

export const validateEmail = (email: string) => {
  const errors = checkValidationErrorsEmail(email);
  return errors === true ? true : errors;
};
