import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/organisms/Header.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginButton from "../molecules/LoginButton";
import TeksBerjalan from "../molecules/marquee";
import Container from 'react-bootstrap/Container';

import { useLocation } from "react-router-dom";



const HeaderSma = () => {
    const location = useLocation();
    return (

        <header className="header">
            <Navbar expand="lg" className="costum-navbar" >
                <Container >
                    <Navbar.Brand href="/"><img
                        src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/sma" className={location.pathname === "/sma" ? "active" : ""}>Beranda</Nav.Link>
                            <Nav.Link href="/sma/profile" className={location.pathname === "/sma/profile" ? "active" : ""}>Profile</Nav.Link>
                            <Nav.Link href="/sma" className={location.pathname === "/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>
                            <NavDropdown title="Acara" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/sma/pengumuman" >Pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/event" >Event</NavDropdown.Item>
                                <NavDropdown.Item href="/smk/kegiatan" >Kegiatan</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Database" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/sma/database/siswa" >Pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/database/alumni" >Event</NavDropdown.Item>
                                <NavDropdown.Item href="/smk/database/guru-tendik" >Kegiatan</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/informasi-pendaftaran" className={location.pathname === "/informasi-pendaftaran" ? "active" : ""}>Informasi Pendaftaran</Nav.Link>

                        </Nav>
                        <LoginButton className="button" />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <TeksBerjalan />
        </header>
    );
};

export default HeaderSma;