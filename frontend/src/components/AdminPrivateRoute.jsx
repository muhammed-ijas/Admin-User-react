
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function AdminPrivateRoute() {
    const { adminInfo } = useSelector((state) => state.admin);

    return adminInfo ? <Outlet /> : <Navigate to={'/admin/login'} replace />;
}

export default AdminPrivateRoute