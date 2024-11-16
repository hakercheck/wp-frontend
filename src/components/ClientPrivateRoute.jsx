import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClientPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (userInfo.role === 'client') ? <Outlet /> : <Navigate to='/login' replace />;
};
export default ClientPrivateRoute;