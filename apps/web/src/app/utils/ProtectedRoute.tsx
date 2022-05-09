import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../state/state';

export default function ProtectedRoute({ children }) {
  const { userInfo } = useContext(AppContext);

  if (userInfo && !userInfo._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
