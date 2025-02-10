import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/admin/AdminLayout.css"
import Sidebar from "../../components/pages/admin/SideBar";
import Dashboard from "../../components/pages/admin/dashboard/DashboardAdmin";
const AdminLayout = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");


    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;