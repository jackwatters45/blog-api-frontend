import SignupForm from './SignupForm';

const Signup = () => {
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   console.log('handleSubmit');
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }

  //   try {
  //     // Read form data
  //     const form = e.currentTarget;
  //     const formData = new FormData(form);

  //     // You can pass formData as a fetch body directly:
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
  //       method: form.method,
  //       body: formData,
  //     });

  //     console.log('response', response);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   setFirstName('');
  //   setLastName('');
  //   setEmail('');
  //   setUsername('');
  //   setPassword('');
  //   setConfirmPassword('');
  // };

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
