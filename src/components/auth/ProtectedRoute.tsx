import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setIsRedirected } from '@/store/userSlice.ts';

type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector(state => state.user.user);
  const tournament = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) dispatch(setIsRedirected(pathname));
  }, []);

  if (!tournament && pathname !== '/tournament/create') {
    return <Navigate to="/tournament/create" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
