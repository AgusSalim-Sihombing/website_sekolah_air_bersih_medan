import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/admin_layout/AdminLayout";

import Dashboard from "../components/pages/admin/dashboard/DashboardAdmin";
import ProtectedRoute from "./ProtectedRoute";
import UserAdmin from "../components/pages/admin/user_admin/UserAdmin";

const AdminRoutes = () => {
    return (
        <Routes>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute />
                }
            >
                {/* <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-admin" element={<UserAdmin />} /> */}
                <Route path="" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="user-admin" element={<UserAdmin />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;