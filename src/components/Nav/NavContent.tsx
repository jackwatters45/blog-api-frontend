import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useUserContext } from '../../context/UserContext';
import { Nav, NavDropdown, NavLink, NavButton } from '@jackwatters/simple-nav';
import useLogout from '../../custom/useLogout';

const NavContent = () => {
  const { user } = useUserContext();
  const { handleClickLogout } = useLogout();

  return (
    <Nav>
      {user ? (
        <>
          {user.userType === 'admin' && (
            <NavDropdown
              buttonOptions={{ text: 'Admin', icon: <AdminPanelSettingsIcon /> }}
            >
              <NavLink to="/admin/users" text="View Users" />
              <NavLink to="/admin/posts" text="View Posts" />
              <NavLink to="/admin/topics" text="View Topics" />
            </NavDropdown>
          )}
          <NavLink to="/write" text="Write" icon={<EditNoteIcon />} />
          <NavDropdown
            buttonOptions={{
              text: 'Account',
              includeText: false,
              icon: <AccountBoxIcon />,
            }}
          >
            <NavLink to={`/my-profile`} text="Profile" />
            <NavLink to={`/edit-profile`} text="Edit Profile" />
            <NavLink to={`/my-posts`} text="Your Posts" />
            <NavLink to={`/saved-posts`} text="Saved Posts" />
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
