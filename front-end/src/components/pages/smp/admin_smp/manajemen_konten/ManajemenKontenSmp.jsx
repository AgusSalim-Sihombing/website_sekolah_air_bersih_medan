import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import KataSambutanSmp from "./kata_sambutan/KataSambutanSmp";
import { useRef, useLayoutEffect, useState } from "react";

const ManajemenKontenSmp = () => {

    const location = useLocation();

    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);

    // Atur padding konten sesuai tinggi nav
    useLayoutEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, [location]); // Update saat route berubah

    return (
        <div>
            {/* Tab Navigasi */}
            <Nav
                ref={navRef}
                variant="tabs"
                style={{
                    backgroundColor: "rgba(242, 242, 300, 1)",
                    position: "fixed",
                    top: "65px",
                    width: "calc(100% - 320px)",
                    zIndex: "1",
                    justifyContent: "center",
                    gap: "20px"
                }}
                className="px-3"
            >

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-smp/manajemen-konten-smp/kata-sambutan-smp"
                        style={{
                            color: location.pathname.includes("kata-sambutan-smp") ? "#FFA500" : "black",
                        }}
                    >
                        Kata Sambutan Kepala Sekolah SMP
                    </Nav.Link>
                </Nav.Item>



                {/* Konten berdasarkan Tab yang diklik */}
                <div className="content-area" style={{ paddingTop: navHeight }}>
                    <Routes>
                        <Route path="kata-sambutan-sma" element={<KataSambutanSmp />} />
                        {/* <Route path="event-sma" element={<AdminEventSma />} /> */}
                    </Routes>
                </div>
            </Nav>
        </div>
    );
}

export default ManajemenKontenSmp;