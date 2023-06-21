import { useState, FormEvent } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  StyledError,
  StyledForm,
  StyledFormContainer,
  StyledFormInput,
  StyledFormLink,
  StyledFormNav,
  StyledFormSection,
  StyledFormSubmitInput,
} from '../../styles/styledComponents/AuthStyledComponents';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: '/' };

  const { updateUser } = useUserContext();

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const [credentialsError, setCredentialsError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: email, password, userType: 'admin' }),
      });

      if (!res.ok) {
        return setCredentialsError('Invalid credentials. Please try again.');
      }

      const responseData = await res.json();
      const { user } = responseData;
      updateUser(user);

      navigate(from);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledFormContainer>
      <StyledFormNav>
        <h1>Log in to your account</h1>
        <p>
          Or <StyledFormLink to={'/signup'}>create a new account</StyledFormLink>
        </p>
      </StyledFormNav>
      <StyledForm method="POST" onSubmit={handleSubmit}>
        <StyledFormSection>
          <label htmlFor="email">Email</label>
          <StyledFormInput
            value={email}
            onChange={handleEmailChange}
            type="email"
            name="username"
            id="email"
            autoComplete="username"
          />
        </StyledFormSection>
        <StyledFormSection>
          <label htmlFor="password">Password</label>
          <StyledFormInput
            value={password}
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
        </StyledFormSection>
        <StyledFormSubmitInput type="submit" value="Log in" />
        {credentialsError && (
          <StyledError>
            <li>{credentialsError}</li>
          </StyledError>
        )}
      </StyledForm>
    </StyledFormContainer>
  );
};

export default Login;
