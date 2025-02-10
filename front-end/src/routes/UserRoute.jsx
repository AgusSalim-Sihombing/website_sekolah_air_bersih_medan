import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/user_layout/UserLayout";
import Home from "../components/pages/user/UserHome";
import About from "../components/pages/user/UserAbout";
import Contact from "../components/pages/user/UserContact";
import Header from "../components/organisms/Header";

const UserRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;