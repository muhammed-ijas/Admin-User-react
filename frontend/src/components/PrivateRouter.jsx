import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from '../pages/Profile';


const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to={'/admin'} />;
}

export default PrivateRoute