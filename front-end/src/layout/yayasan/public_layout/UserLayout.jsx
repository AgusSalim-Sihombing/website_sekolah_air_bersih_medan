import { Outlet } from "react-router-dom";
import HeaderYayasan from "../../../components/organisms/yayasan/HeaderYayasan";
import FooterYayasan from "../../../components/organisms/yayasan/FooterYayasan";

const UserLayout = () => {
    return (
        <div>
            <HeaderYayasan/>
            <main>
                <Outlet />
            </main>
            <FooterYayasan/>
        </div>
    );
};

export default UserLayout;