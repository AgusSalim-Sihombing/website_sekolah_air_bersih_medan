import CarouselBerandaSma from "../../../molecules/carousel/sma/CarouselBerandaSma";
import Events from "../../../molecules/Events";
import VisiMisiTujuan from "../../../molecules/VisiMisi";
import KataSambutan from "./kata_sambutan/KataSambutan";
import OrganizationalChart from "./StrukturisasiSma/StrukturisasiSma";
// import Strukturisasi from "./StrukturisasiSma";
import { Container } from "react-bootstrap";

const DashboardSma = () => {
    return (
        <div>

            <CarouselBerandaSma />
            <KataSambutan />
            <VisiMisiTujuan />
            {/* <Strukturisasi/> */}
            <OrganizationalChart />
            <Events />
        </div>
    )
}

export default DashboardSma;