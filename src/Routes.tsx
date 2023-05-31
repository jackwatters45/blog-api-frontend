import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Home/Dashboard';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Post from './components/Posts/Post/Post';
import User from './components/User/User';
import NotFoundPage from './components/Errors/NotFoundPage';
import Topics from './components/Topics/Topics';
import PopularPosts from './components/Posts/PopularPosts';
import PopularAuthors from './components/User/PopularAuthors';
import PostForm from './components/Posts/PostForm/PostForm';
import MyPosts from './components/Posts/MyPosts/MyPosts';
import EditPost from './components/Posts/PostForm/EditPost';
import EditPostsAdmin from './components/Admin/EditPostsAdmin';
import CreateUser from './components/Admin/CreateUser';
import Layout from './Layout';

const RoutesComponent = () => {
  const userContext = useContext(UserContext);
  // TODO handle error (your session has expired log in again)
  // if (!userContext) return null;

  useEffect(() => {
    if (userContext?.user) console.log(userContext?.user);
  }, [userContext]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* root route index below, move  */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore-posts" element={<PopularPosts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/write" element={<PostForm />} />
        <Route path="/explore-authors" element={<PopularAuthors />} />
        <Route path="/user/:id" element={<User />}>
          <Route path=":type" element={<User />} />
        </Route>
        <Route path="/explore-topics" element={<Topics />} />
        <Route path="/topic/:id" element={<Topics />} />
        <Route path="/my-posts" element={<MyPosts />} />

        <Route path="/admin" element={<h1>404</h1>} />
        <Route path="/admin/posts" element={<EditPostsAdmin />} />

        <Route path="/admin/users" />
        <Route path="create" element={<CreateUser />} />
      </Route>

      {/* note sure if i want page at index */}
      {/* <Route index element={<NotFoundPage />} />  */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesComponent;
