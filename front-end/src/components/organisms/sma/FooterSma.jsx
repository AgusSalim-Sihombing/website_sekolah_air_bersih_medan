import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";


const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const footerSma = () => {
    const [arsipTahun, setArsipTahun] = useState([]);

    useEffect(() => {
        const fetchTahun = async () => {
            try {
                const res = await axios.get(`${API_URL}/public/arsip-tahun`);
                setArsipTahun(res.data);
            } catch (err) {
                console.error("Gagal mengambil data arsip tahun", err);
            }
        };
        fetchTahun();
    }, []);


    return (
        <footer style={{ backgroundColor: "rgba(3, 29, 68, 1)", color: "white" }} className="pt-4 pb-2 mt-5">
            <Container>
                <Row>
                    {/* Kontak */}
                    <Col md={4} className="mb-3">
                        <h5>SMA Advent Air Bersih</h5>
                        <p><FaMapMarkerAlt /> Jl. Contoh No.123, Medan</p>
                        <p><FaPhone /> (061) 123456</p>
                        <p><FaEnvelope /> info@smaairbersih.sch.id</p>
                    </Col>

                    {/* Navigasi */}
                    <Col md={4} className="mb-3">
                        <h5>Menu</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Beranda</a></li>
                            <li><a href="/profil" className="text-white text-decoration-none">Profil Sekolah</a></li>
                            <li><a href="/galeri" className="text-white text-decoration-none">Galeri</a></li>
                            <li><a href="/kontak" className="text-white text-decoration-none">Kontak</a></li>
                        </ul>

                        <h5 className="mt-3">Arsip Alumni</h5>
                        <div style={{ maxHeight: "150px", overflowY: "clip" }}>
                            <select
                                className="form-select"
                                size={5} // agar tampil seperti dropdown besar dan bisa di-scroll
                                onChange={(e) => {
                                    if (e.target.value) window.location.href = `/arsip/${e.target.value}`;
                                }}
                            >
                                <option value="">Pilih Tahun</option>
                                {arsipTahun.map((tahun) => (
                                    <option key={tahun.id} value={tahun.id}>
                                        {tahun.tahun} ({tahun.program_studi})
                                    </option>
                                ))}
                            </select>
                        </div>

                    </Col>

                    {/* Sosial Media */}
                    <Col md={4} className="mb-3">
                        <h5>Ikuti Kami</h5>
                        <p>
                            <a href="https://www.facebook.com/share/g/1BVkmQZSZf/?mibextid=wwXIfr" className="text-white me-3" title="Facebook PERGURUAN ADVENT AIR BERSIH"><FaFacebook /></a>
                            <a href="https://www.instagram.com/adventairbersih?igsh=cmhib2FtanNrYm1m" className="text-white me-3" title="Instagram PERGURUAN ADVENT AIR BERSIH"><FaInstagram /></a>
                            <a href="https://www.tiktok.com/@perguruanadventairbersih?_t=ZS-8zE2Lfyj6Mn&_r=1" className="text-white me-3" title="Tik-Tok PERGURUAN ADVENT AIR BERSIH"><FaTiktok /></a>
                            <a href="https://www.linkedin.com/in/perguruan-advent-air-bersih-medan-209802375" className="text-white " title="Linkedin PERGURUAN ADVENT AIR BERSIH"><FaLinkedin/></a>
                        </p>
                    </Col>
                </Row>

                <hr className="border-top border-light" />

                <Row>
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} SMA Advent Air Bersih. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default footerSma;
