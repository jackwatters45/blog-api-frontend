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
  ListMessage,
} from '../../../styles/styledComponents/AuthStyledComponents';
import IUser from '../../../../types/user';
import { UserInputs } from '../../../../types/utils/formInputs';

interface Props {
  onSubmit: SubmitHandler<UserInputs>;
  submitText: string;
  confirmText?: string;
  signupError: string;
  userData?: IUser;
  isAdminView?: boolean;
  showDelete?: boolean;
  showPassword?: boolean;
  showAvatar?: boolean;
  showDescription?: boolean;
}

const UserForm = ({
  onSubmit,
  submitText,
  confirmText,
  signupError,
  userData,
  isAdminView = false,
  showPassword = false,
  showAvatar = false,
  showDescription = false,
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

  return (
    <StyledForm
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          autoComplete="email"
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
          autoComplete="username"
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
      {showPassword && (
        <>
          <StyledFormSection>
            <label htmlFor="password">Password:</label>
            <StyledFormInput
              type="password"
              id="password"
              autoComplete="new-password"
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
              autoComplete="new-password"
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
        </>
      )}
      {showDescription && (
        <StyledFormSection>
          <label htmlFor="description">User Description (Optional):</label>
          <StyledTextArea
            id="description"
            aria-invalid={errors.description ? 'true' : 'false'}
            {...register('description', {
              maxLength: {
                value: 250,
                message: "Description can't exceed 250 characters",
              },
            })}
          />
          {errors.description && (
            <StyledError>
              <li>{errors.description.message}</li>
            </StyledError>
          )}
        </StyledFormSection>
      )}
      {showAvatar && (
        <StyledFormSection>
          <label htmlFor="avatar">Avatar (Optional):</label>
          <StyledFormInput
            type="file"
            id="avatar"
            accept="image/*"
            aria-invalid={errors.avatar ? 'true' : 'false'}
            {...register('avatar')}
          />
          {errors.avatar && (
            <StyledError>
              <li>{errors.avatar.message}</li>
            </StyledError>
          )}
        </StyledFormSection>
      )}
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
      {confirmText && (
        <ListMessage>
          <li>{confirmText}</li>
        </ListMessage>
      )}
    </StyledForm>
  );
};

export default UserForm;
