// PublicSmpLayout.jsx
import { Outlet } from "react-router-dom";
import HeaderSmp from "../../../components/organisms/smp/HeaderSmp";
import FooterSmp from "../../../components/organisms/smp/FooterSmp";
import "./PublicSmpLayout.css";
const PublicSmpLayout = () => {
    return (
        <div className="main-wrapper-dashboard-smp">
            <HeaderSmp />
            <main className="main-content-dashboard-smp">
                <Outlet />
            </main>
            <FooterSmp />
        </div>
    );
};

export default PublicSmpLayout;
