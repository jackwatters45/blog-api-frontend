import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/FormHelpers';
import UserForm from '../../shared/UserForm/UserForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { UserInputs } from '../../../../types/utils/formInputs';

const CreateUser = () => {
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState<string>('');

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return setSignupError('Invalid credentials. Please try again.');
      }

      await response.json();
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
        isAdminView={true}
        submitText={'Create User'}
        signupError={signupError}
      />
    </StyledFormContainer>
  );
};

export default CreateUser;
