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
} from '../../../styles/styledComponents/FormHelpers';

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  userType?: string;
};

type Props = {
  onSubmit: SubmitHandler<Inputs>;
  submitText: string;
  signupError: string;
  isAdminView?: boolean;
};

// TODO remove default values
const UserForm = ({ isAdminView, onSubmit, signupError, submitText }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
      <StyledFormSection>
        <label htmlFor="firstName">First Name:</label>
        <StyledFormInput
          type="text"
          id="firstName"
          defaultValue={'Jeff'}
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
          defaultValue={'Stein'}
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
          defaultValue={'some@email.com'}
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
          defaultValue={'jstein'}
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
          defaultValue={'passwordA1$'}
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', { required: true, validate: validatePasswordHooks })}
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
          defaultValue={'passwordA1$'}
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
      {isAdminView && (
        <StyledFormSection>
          <label htmlFor="userType">User Type:</label>
          <StyledFormSelect id="userType" {...register('userType')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </StyledFormSelect>
        </StyledFormSection>
      )}
      <StyledFormSubmitInput type="submit" value={submitText} />
      {signupError && (
        <StyledError>
          <li>{signupError}</li>
        </StyledError>
      )}
    </StyledForm>
  );
};

export default UserForm;
