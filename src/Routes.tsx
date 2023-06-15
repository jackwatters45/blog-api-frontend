import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Home/Dashboard';
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
import Layout from './Layout';
import EditUsersAdmin from './components/Admin/Users/EditUsersAdmin';
import EditUser from './components/Admin/Users/EditUser';
import EditTopicsAdmin from './components/Admin/Topics/EditTopicsAdmin';
import CreateUser from './components/Admin/Users/CreateUser';
import EditTopic from './components/Admin/Topics/EditTopic';
import EditProfile from './components/User/EditProfile';
import MyProfile from './components/User/MyProfile';
import UnauthorizedPage from './components/Errors/Unauthorized';
import { useUserContext } from './context/UserContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ViewDeletedUser from './components/User/Deleted/ViewDeletedUser';
import { useEffect, useState } from 'react';
import Loading from './components/shared/Loading';

const RoutesComponent = () => {
  const { user, updateUser } = useUserContext();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const { isAuthenticated, user } = await res.json();
          updateUser(isAuthenticated ? user : undefined);
          setIsUserLoaded(true);
        } else {
          updateUser(undefined);
          setIsUserLoaded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [updateUser]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  if (!isUserLoaded) return <Loading />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="/" element={<Layout />}>
          {/* Public */}
          <Route index element={<Dashboard />} />
          <Route path="/explore-posts" element={<PopularPosts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/explore-authors" element={<PopularAuthors />} />
          <Route path="/user/:id" element={<User />}>
            <Route path=":type" element={<User />} />
          </Route>
          <Route path="/explore-topics" element={<Topics />} />
          <Route path="/topic/:id" element={<Topics />} />

          {/* Logged in */}
          <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/login" />}>
            <Route path="/write" element={<PostForm />} />
            <Route path="/my-profile" element={<MyProfile />}>
              <Route path=":type" element={<MyProfile />} />
            </Route>
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute isAllowed={user?.userType === 'admin'} />}>
            <Route path="/admin">
              <Route path="posts">
                <Route index element={<EditPostsAdmin />} />
                <Route path=":id/edit" element={<EditPost />} />
              </Route>

              <Route path="users">
                <Route index element={<EditUsersAdmin />} />
                <Route path="create" element={<CreateUser />} />
                <Route path=":id/edit" element={<EditUser />} />
                <Route path=":id/deleted" element={<ViewDeletedUser />}>
                  <Route path=":type" element={<ViewDeletedUser />} />
                </Route>
              </Route>

              <Route path="topics">
                <Route index element={<EditTopicsAdmin />} />
                <Route path="create" element={<EditTopic />} />
                <Route path=":id/edit" element={<EditTopic />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
