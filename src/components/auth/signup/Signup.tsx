import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <main className="signup">
      <nav>
        <h1>Sign up</h1>
        <p>
          Or <Link to="/login">sign in to your existing account</Link>
        </p>
      </nav>
      <SignupForm />
    </main>
  );
};

export default Signup;
