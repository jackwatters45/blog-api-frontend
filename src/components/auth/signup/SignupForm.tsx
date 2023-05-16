import { useForm, SubmitHandler } from 'react-hook-form';
import { validateEmailHooks } from '../../../utils/validateEmail';
import { validatePasswordHooks } from '../../../utils/validatePassword';
import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { formatErrors, passwordRequirements } from '../../../utils/formatErrors';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

// TODO may need to reset form but i don't think so
const SignupForm = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const [credentialsError, setCredentialsError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return setCredentialsError('Invalid credentials. Please try again.');
      }

      const responseData = await response.json();
      const { user } = responseData;
      updateUser(user);

      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
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
          <ul className="error">
            <li>{errors.firstName.message}</li>
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
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
          <ul className="error">
            <li>{errors.lastName.message}</li>
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          defaultValue={'some@email.com'}
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true, validate: validateEmailHooks })}
        />
        {errors.email && errors.email.message && (
          <ul className="error">{formatErrors(errors.email.message)}</ul>
        )}
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
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
          <ul className="error">
            <li>{errors.username.message}</li>
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          defaultValue={'passwordA1$'}
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', { required: true, validate: validatePasswordHooks })}
        />
        {errors.password && errors.password.message ? (
          <ul className="error">{formatErrors(errors.password.message)}</ul>
        ) : (
          <ul className="instructions">
            {passwordRequirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
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
          <ul className="error">
            <li>{errors.confirmPassword.message}</li>
          </ul>
        )}
      </div>
      <input type="submit" value="Sign Up" />
      {credentialsError && (
        <ul className="error">
          <li>{credentialsError}</li>
        </ul>
      )}
    </form>
  );
};

export default SignupForm;
