import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/FormHelpers';
import UserForm from '../../shared/UserForms/UserForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { UserInputs } from '../../../../types/utils/formInputs';
import useErrorHandler from '../../../custom/useErrorHandler';

const CreateUser = () => {
  const handleErrors = useErrorHandler();
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState<string>('');

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        handleErrors(res);
        return setSignupError('Invalid credentials. Please try again.');
      }

      navigate('/admin/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledFormContainer>
      <StyledH1Centered>Create User</StyledH1Centered>
      <UserForm
        onSubmit={onSubmit}
        submitText={'Create User'}
        signupError={signupError}
        isAdminView={true}
        showPassword={true}
      />
    </StyledFormContainer>
  );
};

export default CreateUser;
