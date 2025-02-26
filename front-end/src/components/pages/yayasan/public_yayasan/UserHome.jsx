
import React from "react";
import VideoOpening from "../../../molecules/VideoOpening";
import YayasanProfile from "../../../molecules/ProfilBeranda";
import VisiMisiTujuan from "../../../molecules/VisiMisi";
import Events from "../../../molecules/Events";
import JajaranPengurus from "../../../molecules/JajaranPengurus";


const UserHome = () => {
    return (
        <div >
            <VideoOpening/>
            <YayasanProfile/>
            <VisiMisiTujuan/>
            <Events/>
            <JajaranPengurus/>
            
        </div>
    )
}

export default UserHome;