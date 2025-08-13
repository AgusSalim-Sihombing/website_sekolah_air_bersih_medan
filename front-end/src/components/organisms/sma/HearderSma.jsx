// import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./HeaderSma.css"
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Container from 'react-bootstrap/Container';
// import { useLocation, useNavigate } from "react-router-dom";
// import TeksBerjalanSma from "../../molecules/marquee";
// import LoginButtonSma from "../../molecules/login_button/LoginButtonSma";
// import axios from "axios";



// const HeaderSma = () => {

//     const [pengumuman, setPengumuman] = useState([]);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const isAcaraActive = [
//         "/sma/acara/events",
//         "/sma/acara/pengumuman",
//         "/sma/acara/dokumentasi-kegiatan"
//     ].some(path => location.pathname.startsWith(path));

//     useEffect(() => {
//         fetchPengumuman();
//     }, []);

//     const fetchPengumuman = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/api/admin-sma/pengumuman-sma");
//             setPengumuman(response.data);
//         } catch (err) {
//             console.error("Gagal ambil pengumuman", err);
//         }
//     };



//     return (

//         <header className="header-sma">
//             <Navbar expand="lg" className="costum-navbar-sma" >
//                 <Container >
//                     <Navbar.Brand href="/"><img
//                         src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
//                         width="50"
//                         height="50"
//                         className="d-inline-block align-top"
//                         alt="logo"
//                     /></Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle-sma" />
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="ms-auto">
//                             <Nav.Link href="/sma" className={location.pathname === "/sma" ? "active" : ""}>Beranda</Nav.Link>
//                             <Nav.Link href="/sma/profile" className={location.pathname === "/sma/profile" ? "active" : ""}>Profile</Nav.Link>
//                             <Nav.Link href="/sma/fasilitas" className={location.pathname === "/sma/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>

//                             <NavDropdown title="Acara" id="basic-nav-dropdown" active={

//                                 location.pathname === "/sma/acara/events"
//                                     || location.pathname === "/sma/acara/pengumuman"
//                                     || location.pathname.startsWith("/sma/acara/pengumuman/detail-pengumuman")
//                                     || location.pathname === "/sma/acara/events"
//                                     || location.pathname.startsWith("/sma/acara/events/detail-events")
//                                     || location.pathname === "/sma/acara/dokumentasi-kegiatan"
//                                     ? "active" : ""}>
//                                 <NavDropdown.Item href="/sma/acara/pengumuman" className={location.pathname === "/sma/acara/pengumuman" ? "active" : ""}>Pengumuman</NavDropdown.Item>
//                                 <NavDropdown.Item href="/sma/acara/events" className={location.pathname === "/sma/acara/events" ? "active" : ""}>Event</NavDropdown.Item>
//                                 <NavDropdown.Item href="/sma/acara/dokumentasi-kegiatan" className={location.pathname === "/sma/acara/kegiatan" ? "active" : ""}>Dokumentasi Kegiatan</NavDropdown.Item>
//                             </NavDropdown>

//                             <NavDropdown title="Database" id="basic-nav-dropdown" >
//                                 <NavDropdown.Item href="/sma/database/data-siswa-sma" >Data Siswa</NavDropdown.Item>
//                                 <NavDropdown.Item href="/sma/database/data-alumni-sma" >Data Alumni</NavDropdown.Item>
//                                 <NavDropdown.Item href="/sma/database/data-guru-tendik" >Data Guru Dan Tendik</NavDropdown.Item>
//                             </NavDropdown>
//                             <Nav.Link href="/informasi-pendaftaran" className={location.pathname === "/informasi-pendaftaran" ? "active" : ""}>Informasi Pendaftaran</Nav.Link>

//                         </Nav>
//                         <LoginButtonSma className="button" />
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//             <TeksBerjalanSma />
//         </header>
//     );
// };

// export default HeaderSma;

import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HeaderSma.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useLocation, useNavigate } from "react-router-dom";
import TeksBerjalanSma from "../../molecules/marquee";
import LoginButtonSma from "../../molecules/login_button/LoginButtonSma";
import axios from "axios";

const HeaderSma = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [showNavbar, setShowNavbar] = useState(true);
    const [scrollPos, setScrollPos] = useState(window.scrollY);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        const response = await axios.get("http://localhost:3001/api/admin-sma/pengumuman-sma");
        setPengumuman(response.data);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll < scrollPos) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
            setScrollPos(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollPos]);

    return (
        <header className={`header-sma ${showNavbar ? "animate-show" : "d-none"}`}>
            <Navbar expand="lg" className="costum-navbar-sma">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="logo"
                            title="SMA Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle-sma" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/sma" className={location.pathname === "/sma" ? "active" : ""}>Beranda</Nav.Link>
                            <Nav.Link href="/sma/profile" className={location.pathname === "/sma/profile" ? "active" : ""}>Profile</Nav.Link>
                            <Nav.Link href="/sma/fasilitas" className={location.pathname === "/sma/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>

                            <NavDropdown title="Acara" id="nav-dropdown-acara"
                                active={
                                    location.pathname.includes("/sma/acara")
                                }>
                                <NavDropdown.Item href="/sma/acara/pengumuman">Pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/acara/events">Event</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/acara/dokumentasi-kegiatan">Dokumentasi Kegiatan</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Database" id="nav-dropdown-database">
                                <NavDropdown.Item href="/sma/database/data-siswa-sma">Data Siswa</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/database/data-alumni-sma">Data Alumni</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/database/data-guru-tendik">Data Guru dan Tendik</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/sma/informasi-pendaftaran" className={location.pathname === "/sma/informasi-pendaftaran" ? "active" : ""}>Informasi Pendaftaran</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <TeksBerjalanSma />
        </header>
    );
};

export default HeaderSma;
