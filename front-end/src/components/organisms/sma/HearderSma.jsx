import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/organisms/HeaderSma.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
 
import Container from 'react-bootstrap/Container';

import { useLocation } from "react-router-dom";

import TeksBerjalanSma from "../../molecules/marquee";
import LoginButtonSma from "../../molecules/login_button/LoginButtonSma";




const HeaderSma = () => {
    const location = useLocation();
    return (

        <header className="header-sma">
            <Navbar expand="lg" className="costum-navbar-sma" >
                <Container >
                    <Navbar.Brand href="/"><img
                        src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle-sma" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/sma" className={location.pathname === "/sma" ? "active" : ""}>Beranda</Nav.Link>
                            <Nav.Link href="/sma/profile" className={location.pathname === "/sma/profile" ? "active" : ""}>Profile</Nav.Link>
                            <Nav.Link href="/sma/fasilitas" className={location.pathname === "/sma/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>
                            <NavDropdown title="Acara" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/sma/pengumuman" >Pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/event" >Event</NavDropdown.Item>
                                <NavDropdown.Item href="/smk/kegiatan" >Kegiatan</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Database" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/sma/database/data-siswa-sma" >Data Siswa</NavDropdown.Item>
                                <NavDropdown.Item href="/sma/database/data-alumni-sma" >Data Alumni</NavDropdown.Item>
                                <NavDropdown.Item href="/smk/database/data-guru-tendik-sma" >Data Guru Dan Tendik</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/informasi-pendaftaran" className={location.pathname === "/informasi-pendaftaran" ? "active" : ""}>Informasi Pendaftaran</Nav.Link>

                        </Nav>
                        <LoginButtonSma className="button" />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <TeksBerjalanSma />
        </header>
    );
};

export default HeaderSma;