import { Navigate } from 'react-router-dom';
import { useDoctorStore } from '../store/useDoctorStore';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useDoctorStore((state) => state.isAuthenticated);
  const token = useDoctorStore((state) => state.token);

  // fallback to token
  if (!isAuthenticated && !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}