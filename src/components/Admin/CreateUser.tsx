import { styled } from 'styled-components';
import { StyledFormContainer } from '../../styles/styledComponents/FormHelpers';
import UserForm, { Inputs } from '../shared/UserForm/UserForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const StyledH1 = styled.h1`
  text-align: center;
`;

const CreateUser = () => {
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      <StyledH1>Create User</StyledH1>
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
