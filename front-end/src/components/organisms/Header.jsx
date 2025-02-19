import React from "react";
// import LoginButton from "../molecules/LoginButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/organisms/Header.css"
import logo from "../../assets/react.svg"

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginButton from "../molecules/LoginButton";
import TeksBerjalan from "../molecules/marquee";
import Container from 'react-bootstrap/Container';

import { useLocation } from "react-router-dom";



const Header = () => {
    const location = useLocation();
    return (
        // <div classNameName="Header">
        //     <Navbar expand="lg" collapseOnSelect classNameName="costum-navbar navbar-expand-md" bg="rgb(4, 16, 61)">
        //         <Navbar.Brand href="/" style={{ color: "white"}}>LOGO</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Navbar.Collapse classNameName="justify-content-end" style={{ gap: "10px" }}>
        //                 <Nav.Link href="/" style={{ color: "white" }}>Beranda</Nav.Link>
        //                 <NavDropdown title="Unit" style={{ color: "white" }}>
        //                     <NavDropdown.Item href="/smp">SMP</NavDropdown.Item>
        //                     <NavDropdown.Item href="/sma">SMA</NavDropdown.Item>
        //                     <NavDropdown.Item href="/smk">SMK</NavDropdown.Item>
        //                 </NavDropdown>
        //                 <Nav.Link href="/infoPendaftaran" style={{ color: "white" }}>Informasi Pendaftaran</Nav.Link>
        //                 <LoginButton />
        //             </Navbar.Collapse>
        //         </Navbar.Collapse>
        //     </Navbar>
        //     <TeksBerjalan/>
        // </div>
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
                                <NavDropdown.Item href="/sma" className={location.pathname === "/smp" ? "active" : ""}>SMP</NavDropdown.Item>
                                <NavDropdown.Item href="/sma" >SMA</NavDropdown.Item>
                                <NavDropdown.Item href="/smk" >SMK</NavDropdown.Item>
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

export default Header;