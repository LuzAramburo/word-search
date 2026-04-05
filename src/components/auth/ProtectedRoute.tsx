import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setIsRedirected } from '@/store/userSlice.ts';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector(state => state.user.user);
  const tournament = useAppSelector(state => state.game.tournament);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  if (!user) {
    dispatch(setIsRedirected(pathname));
    return <Navigate to="/login" />;
  }

  if (!tournament && pathname !== '/tournament' && pathname !== '/tournament/create') {
    return <Navigate to="/tournament" />;
  }

  return children;
};

export default ProtectedRoute;
