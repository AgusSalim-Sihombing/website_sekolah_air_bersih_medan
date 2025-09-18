import { Outlet} from "react-router-dom";
import "../../../styles/admin/AdminLayout.css"
import { useState } from "react";
import SidebarAdminSmk from "../../../components/pages/smk/admin_smk/SideBarAdminSmk";
import HeaderAdminSmk from "../../../components/pages/smk/admin_smk/HeaderAdminSmk";


const AdminSmkLayout = () => {
    const [pageTitle, setPageTitle] = useState("Dashboard");
    
    return (
        
        <div className="dashboard-container">
            <SidebarAdminSmk setPageTitle={setPageTitle}/>
            <div className="main-wrapper">
                <HeaderAdminSmk title={pageTitle} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminSmkLayout;