import Events from "../../../molecules/Events";
import VisiMisiTujuan from "../../../molecules/VisiMisi";
import CarouselBerandaSma from "./CarouselSma"
import KataSambutan from "./KataSambutan";
import OrganizationalChart from "./StrukturisasiSma";
// import Strukturisasi from "./StrukturisasiSma";


const DashboardSma = () => {
    return (
        <div>
            <CarouselBerandaSma/>
            <KataSambutan/>
            <VisiMisiTujuan/>
            {/* <Strukturisasi/> */}
            <OrganizationalChart/>
            <Events/>
        </div>
    )
}

export default DashboardSma;