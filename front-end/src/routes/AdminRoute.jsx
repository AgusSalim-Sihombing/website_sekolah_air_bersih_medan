import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/admin_layout/AdminLayout";

import Dashboard from "../components/pages/admin/dashboard/DashboardAdmin";
import ProtectedRoute from "./ProtectedRoute";
import UserAdmin from "../components/pages/admin/user_admin/UserAdmin";
import ManajemenKonten from "../components/pages/admin/manajemen_konten/ManajemenKonten";
import ManajemenData from "../components/pages/admin/manajemen_data_sekolah/ManajemenDataSekolah"
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
                    <Route path="manajemen-konten" element={<ManajemenKonten />} />
                    <Route path="manajemen-data" element={< ManajemenData/>} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;