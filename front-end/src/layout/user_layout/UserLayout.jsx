import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

const UserLayout = () => {
    return (
        <div>
            {/* <header>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </nav>
            </header> */}
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
};

export default UserLayout;