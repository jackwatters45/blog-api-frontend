import { useForm, SubmitHandler } from 'react-hook-form';
import { validateEmailHooks } from './utils/validateEmail';
import { validatePasswordHooks } from './utils/validatePassword';
import { formatErrors, passwordRequirements } from './utils/formHelpers';
import {
  StyledError,
  StyledForm,
  StyledFormSection,
  StyledFormInput,
  StyledFormInstructions,
  StyledFormSelect,
  StyledFormSubmitInput,
  StyledTextArea,
  SelectWrapper,
  StyledDeleteAccountButton,
  DangerText,
} from '../../../styles/styledComponents/FormHelpers';
import IUser from '../../../../types/user';
import { UserInputs } from '../../../../types/utils/formInputs';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useLogout from '../../Auth/Logout';

interface Props {
  onSubmit: SubmitHandler<UserInputs>;
  submitText: string;
  signupError: string;
  isAdminView?: boolean;
  userData?: IUser;
  showDelete?: boolean;
}

const UserForm = ({
  isAdminView,
  onSubmit,
  signupError,
  submitText,
  userData,
  showDelete = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInputs>({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      username: userData?.username,
      userType: userData?.userType,
      description: userData?.description,
    },
  });
  const { logout } = useLogout();

  const navigate = useNavigate();
  const deleteUser = useCallback(async () => {
    const id = userData?._id;
    await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/delete`, {
      method: 'PATCH',
      credentials: 'include',
    });

    logout();

    return navigate('/');
  }, [navigate, userData, logout]);

  return (
    <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
      <StyledFormSection>
        <label htmlFor="firstName">First Name:</label>
        <StyledFormInput
          type="text"
          id="firstName"
          aria-invalid={errors.firstName ? 'true' : 'false'}
          {...register('firstName', {
            required: 'First name is required',
            maxLength: { value: 20, message: "First name can't exceed 20 characters" },
          })}
        />
        {errors.firstName && (
          <StyledError>
            <li>{errors.firstName.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="lastName">Last Name:</label>
        <StyledFormInput
          type="text"
          id="lastName"
          aria-invalid={errors.lastName ? 'true' : 'false'}
          {...register('lastName', {
            required: 'Last name is required',
            maxLength: { value: 30, message: "Last name can't exceed 30 characters" },
          })}
        />
        {errors.lastName && (
          <StyledError>
            <li>{errors.lastName.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="email">Email:</label>
        <StyledFormInput
          type="email"
          id="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true, validate: validateEmailHooks })}
        />
        {errors.email && errors.email.message && (
          <StyledError>{formatErrors(errors.email.message)}</StyledError>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="username">Username:</label>
        <StyledFormInput
          type="text"
          id="username"
          aria-invalid={errors.username ? 'true' : 'false'}
          {...register('username', {
            required: 'Username is required',
            maxLength: { value: 20, message: "Username can't exceed 20 characters" },
          })}
        />
        {errors.username && (
          <StyledError>
            <li>{errors.username.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="password">Password:</label>
        <StyledFormInput
          type="password"
          id="password"
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register(
            'password',
            isAdminView
              ? {}
              : {
                  required: true,
                  validate: validatePasswordHooks,
                },
          )}
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
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          {...register(
            'confirmPassword',
            isAdminView
              ? {}
              : {
                  required: true,
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = watch();
                      return password === value || 'Passwords should match!';
                    },
                  },
                },
          )}
        />
        {errors.confirmPassword && (
          <StyledError>
            <li>{errors.confirmPassword.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <label htmlFor="description">User Description (Optional):</label>
        <StyledTextArea
          id="description"
          aria-invalid={errors.description ? 'true' : 'false'}
          {...register('description', {
            maxLength: { value: 250, message: "Description can't exceed 250 characters" },
          })}
        />
        {errors.description && (
          <StyledError>
            <li>{errors.description.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      {isAdminView && (
        <StyledFormSection>
          <label htmlFor="userType">User Type:</label>
          <SelectWrapper>
            <StyledFormSelect id="userType" {...register('userType')}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </StyledFormSelect>
          </SelectWrapper>
        </StyledFormSection>
      )}
      <StyledFormSubmitInput type="submit" value={submitText} />
      {signupError && (
        <StyledError>
          <li>{signupError}</li>
        </StyledError>
      )}
      {showDelete && (
        <div>
          <DangerText>Danger Zone</DangerText>
          <StyledDeleteAccountButton
            type="button"
            value={'Delete User'}
            onClick={deleteUser}
          />
        </div>
      )}
    </StyledForm>
  );
};

export default UserForm;
