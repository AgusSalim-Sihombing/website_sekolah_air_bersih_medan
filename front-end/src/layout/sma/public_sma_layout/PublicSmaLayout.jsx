import { Outlet } from "react-router-dom";
// import Footer from "../../../components/organisms/Footer";
import HeaderSma from "../../../components/organisms/HearderSma";

const PublicSmaLayout = () => {
    return (
        <div>

            <HeaderSma/>
            <main>
                <Outlet />
            </main>
            {/* <Footer/> */}
        </div>
    );
};

export default PublicSmaLayout;