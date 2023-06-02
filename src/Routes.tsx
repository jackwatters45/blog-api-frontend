import { Route, Routes } from 'react-router-dom';
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

const RoutesComponent = () => {
  // const userContext = useContext(UserContext);
  // TODO handle error (your session has expired log in again)
  // if (!userContext) return null;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="/explore-posts" element={<PopularPosts />} />
        <Route path="/post/:id" element={<Post />}>
          <Route path="edit" element={<EditPost />} />
        </Route>

        <Route path="/write" element={<PostForm />} />

        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/explore-authors" element={<PopularAuthors />} />
        <Route path="/user/:id" element={<User />}>
          <Route path=":type" element={<User />} />
        </Route>

        <Route path="/explore-topics" element={<Topics />} />
        <Route path="/topic/:id" element={<Topics />} />

        <Route path="/admin/posts">
          <Route index element={<EditPostsAdmin />} />
          <Route path=":id/edit" element={<EditPost />} />
        </Route>

        <Route path="/admin/users">
          <Route index element={<EditUsersAdmin />} />
          <Route path="create" element={<CreateUser />} />
          <Route path=":id/edit" element={<EditUser />} />
        </Route>

        <Route path="/admin/topics">
          <Route index element={<EditTopicsAdmin />} />
          <Route path="create" element={<EditTopic />} />
          <Route path=":id/edit" element={<EditTopic />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesComponent;
