// PublicSmpLayout.jsx
import { Outlet } from "react-router-dom";
import "./PublicSmkLayout.css";
import HeaderSmk from "../../../components/organisms/smk/HeaderSmk";
import FooterSmk from "../../../components/organisms/smk/FooterSmk";
const PublicSmkLayout = () => {
    return (
        <div className="main-wrapper-dashboard-smk">
            <HeaderSmk />
            <main className="main-content-dashboard-smk">
                <Outlet />
            </main>
            <FooterSmk />
        </div>
    );
};

export default PublicSmkLayout;
