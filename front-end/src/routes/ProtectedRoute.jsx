import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/pages/admin/SideBar";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;