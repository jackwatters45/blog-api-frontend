import { useForm, SubmitHandler } from 'react-hook-form';
import { validatePasswordHooks } from './utils/validatePassword';
import { formatErrors, passwordRequirements } from './utils/formHelpers';
import {
  StyledError,
  StyledFormSection,
  StyledFormInput,
  StyledFormInstructions,
  StyledFormSubmitInput,
  StyledFormPassword,
  ListMessage,
} from '../../../styles/styledComponents/FormHelpers';
import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import useErrorHandler from '../../Errors/useErrorHandler';

interface PasswordInputs {
  password: string;
  confirmPassword: string;
}

interface Props {
  isOwnProfile?: boolean;
}

const ChangePasswordForm = ({ isOwnProfile }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordInputs>();
  const { user } = useUserContext();
  const { id } = useParams();

  const handleErrors = useErrorHandler();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit: SubmitHandler<PasswordInputs> = async (data) => {
    let userId;
    if (isOwnProfile) {
      if (!user) return navigate('/login');
      userId = user._id;
    } else {
      if (!id) return navigate('/admin/users');
      userId = id;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        handleErrors(res);
        return setErrorMessage('Error changing password. Please try again.');
      } else {
        const { message } = await res.json();
        setSuccessMessage(message);
      }
      reset();
    } catch (err) {
      setErrorMessage('Error changing password. Please try again.');
    }
  };

  return (
    <StyledFormPassword
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledFormSection>
        <label htmlFor="password">Password:</label>
        <StyledFormInput
          type="password"
          id="password"
          autoComplete="new-password"
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', {
            required: true,
            validate: validatePasswordHooks,
          })}
        />
        {errors.password && errors.password.message ? (
          <StyledError>{formatErrors(errors.password.message)}</StyledError>
        ) : (
          <StyledFormInstructions>
            {passwordRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </StyledFormInstructions>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <StyledFormInput
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          {...register('confirmPassword', {
            required: true,
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = watch();
                return password === value || 'Passwords should match!';
              },
            },
          })}
        />
        {errors.confirmPassword && (
          <StyledError>
            <li>{errors.confirmPassword.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSubmitInput type="submit" value={'Change Password'} />
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
      {successMessage && <ListMessage>{successMessage}</ListMessage>}
    </StyledFormPassword>
  );
};

export default ChangePasswordForm;
