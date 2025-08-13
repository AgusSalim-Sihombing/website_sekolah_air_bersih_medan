import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import "./FooterSmp.css";

const FooterSmp = () => {
    return (
        <footer className="footer-smp">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>SMP Advent Air Bersih</h5>
                        <p><FaMapMarkerAlt /> Jl. Contoh No.456, Medan</p>
                        <p><FaPhone /> (061) 789012</p>
                        <p><FaEnvelope /> info@smpairbersih.sch.id</p>
                    </Col>
                    <Col md={4}>
                        <h5>Menu</h5>
                        <ul className="list-unstyled">
                            <li><a href="/smp" className="text-white text-decoration-none">Beranda</a></li>
                            <li><a href="/smp/profile" className="text-white text-decoration-none">Profil</a></li>
                            <li><a href="/smp/fasilitas" className="text-white text-decoration-none">Fasilitas</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Ikuti Kami</h5>
                        <p>
                            <a href="#" className="text-white me-3"><FaFacebook /></a>
                            <a href="#" className="text-white me-3"><FaInstagram /></a>
                            <a href="#" className="text-white"><FaYoutube /></a>
                        </p>
                    </Col>
                </Row>
                <hr className="border-top border-light" />
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} SMP Advent Air Bersih. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterSmp;
