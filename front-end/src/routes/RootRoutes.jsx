import React from "react";
import { Route, Routes } from "react-router-dom";
import BerandaPage from "../components/pages/BerandaPage.jsx";
import Header from "../components/organisms/Header.jsx";


const RootRoutes = () => {
    return (
        
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<BerandaPage />} />
                </Routes>
            </div>
    

    )
}

export default RootRoutes;