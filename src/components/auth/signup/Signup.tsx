import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <main className="signup">
      <nav>
        <h1>Sign up</h1>
        <p>
          Or <a href="/login">sign in to your existing account</a>
        </p>
      </nav>
      <SignupForm />
    </main>
  );
};

export default Signup;
