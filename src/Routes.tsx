import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/signup/Signup';
import Home from './components/Home';
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
      <Route
        path="/"
        element={userContext?.user ? <Home /> : <Navigate to={'/login'} />}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesComponent;
