import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/signup/Signup';
import Dashboard from './components/home/Dashboard';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

const RoutesComponent = () => {
  const userContext = useContext(UserContext);
  // TODO handle error (your session has expired log in again)
  // if (!userContext) return null;

  useEffect(() => {
    if (userContext?.user) console.log(userContext?.user);
  }, [userContext]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<h1>404</h1>} />
      <Route path="/write" element={<h1>404</h1>} />
      <Route path="/profile" element={<h1>404</h1>} />
      <Route path="/my-posts" element={<h1>404</h1>} />
    </Routes>
  );
};

export default RoutesComponent;
