import { Outlet} from "react-router-dom";
import "../../../styles/admin/AdminLayout.css"
import { useState } from "react";
import SidebarAdminSmp from "../../../components/pages/smp/admin_smp/SideBarAdminSmp";
import HeaderAdminSmp from "../../../components/pages/smp/admin_smp/HeaderAdminSmp";


const AdminSmpLayout = () => {
    const [pageTitle, setPageTitle] = useState("Dashboard");
    
    return (
        
        <div className="dashboard-container">
            <SidebarAdminSmp setPageTitle={setPageTitle}/>
            <div className="main-wrapper">
                <HeaderAdminSmp title={pageTitle} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminSmpLayout;