import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/user_layout/UserLayout";
import Home from "../components/pages/user/UserHome";
import InformasiPendaftaran from "../components/pages/user/InformasiPendaftaran";
// import Contact from "../components/pages/user/UserContact";
import Header from "../components/organisms/Header";

const UserRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="informasi-pendaftaran" element={<InformasiPendaftaran />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Route>
        </Routes>
    );
};

export default UserRoutes;