import { Outlet } from "react-router-dom";
import { useState } from "react";


import "../../../styles/admin/AdminLayout.css"
import SidebarAdminYayasan from "../../../components/pages/yayasan/admin_yayasan/SideBarAdminYayasan";
import HeaderAdminYayasan from "../../../components/pages/yayasan/admin_yayasan/HeaderAdminYayasan";


const AdminLayout = () => {
    const [pageTitle, setPageTitle] = useState("Dashboard");
    return (
        <div className="dashboard-container">
            <SidebarAdminYayasan setPageTitle={setPageTitle} />
            <div className="main-wrapper">
                <HeaderAdminYayasan title={pageTitle} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
