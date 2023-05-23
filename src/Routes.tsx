import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/signup/Signup';
import Dashboard from './components/Home/Dashboard';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Post from './components/Posts/Post/Post';
import User from './components/User/User';
import NotFoundPage from './components/Errors/NotFoundPage';
import Topics from './components/Topics/Topics';

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
      <Route path="/post/:id" element={<Post />} />

      <Route path="/user/:id" element={<User />}>
        <Route path=":type" element={<User />} />
      </Route>

      <Route path="/explore-topics" element={<Topics />} />
      <Route path="/topic/:id" element={<Topics />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<h1>404</h1>} />
      <Route path="/write" element={<h1>404</h1>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesComponent;
