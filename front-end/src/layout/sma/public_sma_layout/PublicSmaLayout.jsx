import { Outlet } from "react-router-dom";
import HeaderSma from "../../../components/organisms/sma/HearderSma";
import FooterSma from "../../../components/organisms/sma/FooterSma";
import "./PublicSmaLayout.css"
const PublicSmaLayout = () => {
    return (
        <div>
            <HeaderSma />
            <div className="main-wrapper-dashboard-sma">
                <main className="main-content-dashboard-sma">
                    <Outlet />
                </main>
                <FooterSma />
            </div>
        </div>
    );
};

export default PublicSmaLayout;