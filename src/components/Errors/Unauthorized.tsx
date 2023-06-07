import { Link } from 'react-router-dom';

function UnauthorizedPage() {
  return (
    <div>
      <h1>You are not authorized to view this page.</h1>

      <p>
        If you are an admin, <Link to="login">login to view this page.</Link>
      </p>

      <p>
        Otherwise, <Link to="/">return home</Link>
      </p>
    </div>
  );
}

export default UnauthorizedPage;
