
import React from "react";
import YayasanProfile from "../../molecules/ProfilBeranda";
import VisiMisiTujuan from "../../molecules/VisiMisi";
import Events from "../../molecules/Events";
import JajaranPengurus from "../../molecules/JajaranPengurus";
// import CarouselBeranda from "../../molecules/CarouselBeranda";
import VideoOpening from "../../molecules/VideoOpening";

const UserHome = () => {
    return (
        <div >
            <VideoOpening/>
            {/* <CarouselBeranda/> */}
            <YayasanProfile/>
            <VisiMisiTujuan/>
            <Events/>
            <JajaranPengurus/>
            
        </div>
    )
}

export default UserHome;