import AdminDokumentasiKegiatan from "./admin_dokumentasi_kegiatan/AdminDokumentasiKegiatan";
import AdminEventSma from "./admin_event_sma/AdminEventSma";
import Fasilitas from "./admin_fasilitas/Fasilitas";
import PengumumanAdminSma from "./admin_pengumunan_sma/PengumumanAdminSma";
import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ProfileSekolahSma from "./admin_profile_sekolah_sma/ProfilSekolahSma";
import KataSambutanSma from "./kata_sambutan/KataSambutanSma";
import CarouselSma from "./admin_carousel_sma/CarouselSma";
import InformasiPendaftaranAdmin from "./admin_informasi_pendaftaran/InformasiPendaftaranAdmin";
import { useRef, useLayoutEffect, useState } from "react";
import EventAdmin from "./admin_event_sma/event/EventAdmin";

const ManajemenKontenSma = () => {

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
                    gap:"20px"
                }}
                className="px-3"
            >
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/carousel-sma"
                        style={{
                            color: location.pathname.includes("carousel-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Carousel
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/kata-sambutan-sma"
                        style={{
                            color: location.pathname.includes("kata-sambutan-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Kata Sambutan Kepala Sekolah SMA
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
                        style={{
                            color: location.pathname.includes("visi-misi-tujuan") ? "#FFA500" : "black",
                        }}
                    >
                        Visi-Misi-Tujuan
                    </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/event-sma"
                        style={{
                            color: location.pathname.includes("event-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Event
                    </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/event"
                        style={{
                            color: location.pathname.includes("event") ? "#FFA500" : "black",
                        }}
                    >
                        Event
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/pengumuman-sma"
                        style={{
                            color: location.pathname.includes("pengumuman-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Pengumuman
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/dokumentasi-kegiatan-sma"
                        style={{
                            color: location.pathname.includes("dokumentasi-kegiatan-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Dokumentasi Event
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/fasilitas"
                        style={{
                            color: location.pathname.includes("fasilitas") ? "#FFA500" : "black",
                        }}
                    >
                        Fasilitas
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/profil-sma"
                        style={{
                            color: location.pathname.includes("profil-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Profil Sekolah SMA
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/informasi-pendaftaran"
                        style={{
                            color: location.pathname.includes("informasi-pendaftaran") ? "#FFA500" : "black",
                        }}
                    >
                        Informasi Pendaftaran
                    </Nav.Link>
                </Nav.Item>

            </Nav>

            {/* Konten berdasarkan Tab yang diklik */}
            <div className="content-area" style={{ paddingTop: navHeight }}>
                <Routes>
                    <Route path="visi-misi-tujuan" element={<AdminVisiMisiTujuan />} />
                    <Route path="carousel-sma" element={<CarouselSma />} />
                    <Route path="kata-sambutan-sma" element={<KataSambutanSma />} />
                    {/* <Route path="event-sma" element={<AdminEventSma />} /> */}
                    <Route path="event" element={<EventAdmin/>}/>
                    <Route path="pengumuman-sma" element={<PengumumanAdminSma />} />
                    <Route path="dokumentasi-kegiatan-sma" element={<AdminDokumentasiKegiatan />} />
                    <Route path="fasilitas" element={<Fasilitas />} />
                    <Route path="profil-sma" element={<ProfileSekolahSma />} />
                    <Route path="informasi-pendaftaran" element={<InformasiPendaftaranAdmin />} />


                </Routes>
            </div>
        </div>
    );
}

export default ManajemenKontenSma;