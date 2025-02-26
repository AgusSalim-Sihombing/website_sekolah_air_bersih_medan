import { Outlet, useNavigate } from "react-router-dom";

import "../../../styles/admin/AdminLayout.css"
import SidebarAdminSma from "../../../components/pages/sma/admin_sma/SideBarAdminSma";
import { useState } from "react";
import HeaderAdminSma from "../../../components/pages/sma/admin_sma/HeaderAdminSma";

const AdminSmaLayout = () => {
    const [pageTitle, setPageTitle] = useState("Dashboard");
    return (
        
        <div className="dashboard-container">
            <SidebarAdminSma setPageTitle={setPageTitle}/>
            <div className="main-wrapper">
                <HeaderAdminSma title={pageTitle} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminSmaLayout;