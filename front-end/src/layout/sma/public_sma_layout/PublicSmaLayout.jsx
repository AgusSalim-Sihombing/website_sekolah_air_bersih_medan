import { Outlet } from "react-router-dom";
import HeaderSma from "../../../components/organisms/sma/HearderSma";
import FooterSma from "../../../components/organisms/sma/FooterSma";


const PublicSmaLayout = () => {
    return (
        <div>

            <HeaderSma/>
            <main>
                <Outlet />
            </main>
            <FooterSma/>
        </div>
    );
};

export default PublicSmaLayout;