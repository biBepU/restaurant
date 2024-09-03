import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export default function AuthForLogin({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}