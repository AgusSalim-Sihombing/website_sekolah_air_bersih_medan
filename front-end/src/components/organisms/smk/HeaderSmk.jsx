import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useLocation, useNavigate } from "react-router-dom";
import TeksBerjalan from "../../molecules/marquee";
import axios from "axios";
import "./HeaderSmk.css";

const HeaderSmk = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [scrollPos, setScrollPos] = useState(window.scrollY);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowNavbar(currentScroll < scrollPos);
            setScrollPos(currentScroll);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollPos]);

    return (
        <header className={`header-smp ${showNavbar ? "animate-show" : "d-none"}`}>
            <Navbar expand="lg" className="costum-navbar-smp">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                            width="50"
                            height="50"
                            alt="SMP Logo"
                            title="SMP Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle-smp" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/smp" className={location.pathname === "/smp" ? "active" : ""}>Beranda</Nav.Link>
                            <Nav.Link href="/smp/profile" className={location.pathname === "/smp/profile" ? "active" : ""}>Profile</Nav.Link>
                            <Nav.Link href="/smp/fasilitas" className={location.pathname === "/smp/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>

                            <NavDropdown title="Acara" active={location.pathname.includes("/smp/acara")}>
                                <NavDropdown.Item href="/smp/acara/pengumuman">Pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/smp/acara/events">Event</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Database">
                                <NavDropdown.Item href="/smp/database/data-siswa-smp">Data Siswa</NavDropdown.Item>
                                <NavDropdown.Item href="/smp/database/data-alumni-smp">Data Alumni</NavDropdown.Item>
                                <NavDropdown.Item href="/smp/database/data-guru-tendik">Data Guru dan Tendik</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/smp/informasi-pendaftaran" className={location.pathname === "/smp/informasi-pendaftaran" ? "active" : ""}>Pendaftaran</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <TeksBerjalan />
        </header>
    );
};

export default HeaderSmk;
