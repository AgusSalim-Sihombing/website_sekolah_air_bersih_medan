import { Outlet } from "react-router-dom";
import HeaderSma from "../../../components/organisms/sma/HearderSma";
import FooterSma from "../../../components/organisms/sma/FooterSma";
import "./PublicSmaLayout.css"
const PublicSmaLayout = () => {
    return (
        <div className="main-wrapper-dashboard-sma">
            <HeaderSma />
            <main className="main-content-dashboard-sma">
                <Outlet />
            </main>
            <FooterSma />
        </div>
    );
};

export default PublicSmaLayout;