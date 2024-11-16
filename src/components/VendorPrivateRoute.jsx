import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VendorPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (userInfo.role === 'vendor') ? <Outlet /> : <Navigate to='/login' replace />;
};
export default VendorPrivateRoute;