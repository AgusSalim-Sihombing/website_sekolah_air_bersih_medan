import { Outlet, useNavigate } from "react-router-dom";

import "../../../styles/admin/AdminLayout.css"
import Sidebar from "../../../components/pages/admin/SideBar";

const AdminLayout = () => {

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