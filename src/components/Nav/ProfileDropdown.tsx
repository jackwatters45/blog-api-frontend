import { mdiAccount } from '@mdi/js';
import NavOption from './NavOption';

const ProfileDropdown = () => {
  return (
    <div>
      <NavOption icon={mdiAccount} text="Profile" />
      <div style={{ display: 'none' }}>dropdown here</div>
    </div>
  );
};

export default ProfileDropdown;
