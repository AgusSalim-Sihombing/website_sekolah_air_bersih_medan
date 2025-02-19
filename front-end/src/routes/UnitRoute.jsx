import { Outlet, useNavigate } from "react-router-dom";

import "../../styles/admin/AdminLayout.css"
import Sidebar from "../../components/pages/admin/SideBar";
import Header from "../components/organisms/Header";

const PublicSmaLayout = () => {

    return (
        <div className="dashboard-container">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicSmaLayout;