import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/auth/authSlice';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.exp * 1000 < Date.now()) {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
} 