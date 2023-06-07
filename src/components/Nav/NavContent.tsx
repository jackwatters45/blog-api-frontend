import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useUserContext } from '../../context/UserContext';
import { Nav, NavDropdown, NavLink, NavButton } from '@jackwatters/simple-nav';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavContent = () => {
  const { updateUser, user } = useUserContext();

  const navigate = useNavigate();
  const handleClickLogout = async () => {
    updateUser(undefined);

    // TODO
    // remove session
    // clear cookies
    Object.keys(Cookies.get()).forEach((name) => Cookies.remove(name));

    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
    });

    navigate('/login');
  };

  return (
    <Nav>
      {user ? (
        <>
          <NavDropdown
            buttonOptions={{ text: 'Admin', icon: <AdminPanelSettingsIcon /> }}
          >
            <NavLink to="/admin/users" text="View Users" />
            <NavLink to="/admin/posts" text="View Posts" />
            <NavLink to="/admin/topics" text="View Topics" />
          </NavDropdown>
          <NavLink to="/write" text="Write" icon={<EditNoteIcon />} />
          <NavDropdown
            buttonOptions={{
              text: 'Account',
              includeText: false,
              icon: <AccountBoxIcon />,
            }}
          >
            <NavLink to={`/user/${user?._id}`} text="Profile" />
            <NavLink to={`/my-posts`} text="Your Posts" />
            <NavLink to={`/user/${user?._id}/settings`} text="Settings" />
            <NavButton onClick={handleClickLogout} text="Log out" />
          </NavDropdown>
        </>
      ) : (
        <>
          <NavLink to="/write" text="Write" icon={<EditNoteIcon />} />
          <NavLink to="/signup" text="Sign up" />
          <NavLink to="/login" text="Log in" />
        </>
      )}
    </Nav>
  );
};

export default NavContent;
