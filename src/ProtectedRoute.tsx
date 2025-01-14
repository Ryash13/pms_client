import { Navigate } from 'react-router-dom';
import { useAuthState } from './context/AuthState';

const ProtectedRoute = ({ element }: any) => {
  const authState = useAuthState();
  const isAuthenticated = authState?.publicId ? true : false;

  if(!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return element;
};

export default ProtectedRoute;
