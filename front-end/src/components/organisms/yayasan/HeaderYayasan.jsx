import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/organisms/Header.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TeksBerjalan from "../../molecules/marquee";
import Container from 'react-bootstrap/Container';

import { useLocation } from "react-router-dom";
import LoginButtonYayasan from "../../molecules/login_button/LoginButtonYayasan";



const HeaderYayasan = () => {
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
                            <Nav.Link href="/" className={location.pathname === "/" ? "active" : ""}>Beranda</Nav.Link>
                            <NavDropdown title="Unit" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/smp" className={location.pathname === "/smp" ? "active" : ""}>SMP</NavDropdown.Item>
                                <NavDropdown.Item href="/sma" >SMA</NavDropdown.Item>
                                <NavDropdown.Item href="/smk" >SMK</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/informasi-pendaftaran" className={location.pathname === "/informasi-pendaftaran" ? "active" : ""}>Informasi Pendaftaran</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <TeksBerjalan />
        </header>
    );
};

export default HeaderYayasan;