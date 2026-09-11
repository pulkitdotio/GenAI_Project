import { Link } from 'react-router';
import { useAuth } from '../../../context/useAuth';
import { getAuthDestination, getAuthState } from '../authRedirect';

// During session resolution, ProtectedRoute waits before making the decision.
function AuthLink({ to, children, ...props }) {
  const { isAuthenticated, loading } = useAuth();
  const destination = getAuthDestination(to);
  const needsLogin = !loading && !isAuthenticated;

  return (
    <Link {...props} to={needsLogin ? '/login' : destination}
      state={needsLogin ? getAuthState(destination) : undefined}>
      {children}
    </Link>
  );
}

export default AuthLink;
