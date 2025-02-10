import React from "react";
import YayasanProfile from "../molecules/ProfilBeranda";
import VisiMisiTujuan from "../molecules/VisiMisi";
import Events from "../molecules/Events";
import JajaranPengurus from "../molecules/JajaranPengurus";
import CarouselBeranda from "../molecules/CarouselBeranda";
const BerandaPage = () => {
    return (
        <div>
            <CarouselBeranda/>
            <YayasanProfile/>
            <VisiMisiTujuan/>
            <Events/>
            <JajaranPengurus/>

        </div>
    )
}

export default BerandaPage;