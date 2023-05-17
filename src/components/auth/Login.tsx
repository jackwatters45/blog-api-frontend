import { useState, FormEvent } from 'react';
import '../../styles/auth.scss';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: email, password, userType: 'admin' }),
      });

      if (!response.ok) {
        return setCredentialsError('Invalid credentials. Please try again.');
      }

      const responseData = await response.json();
      const { user } = responseData;
      updateUser(user);

      navigate('/');
    } catch (err) {
      console.log(err);
    }

    // TODO test whether this part needed
    // setEmail('');
    // setPassword('');
    // setCredentialsError('');
  };

  return (
    <main className="login">
      <nav>
        <h1>Log in to your account</h1>
        <p>
          Or <a href="/signup">create a new account</a>
        </p>
      </nav>
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            name="username"
            id="email"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <input type="submit" value="Log in" />
        {credentialsError && <p className="error">{credentialsError}</p>}
      </form>
    </main>
  );
};

export default Login;
