import AdminDokumentasiKegiatan from "./admin_dokumentasi_kegiatan/AdminDokumentasiKegiatan";
import AdminEventSma from "./admin_event_sma/AdminEventSma";
import Fasilitas from "./admin_fasilitas/Fasilitas";
import PengumumanAdminSma from "./admin_pengumunan_sma/PengumumanAdminSma";
import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ManajemenKontenSma = () => {

    const location = useLocation();

    return (
        <div>
            {/* Tab Navigasi */}
            <Nav
                variant="tabs"
                style={{
                    backgroundColor: "rgba(242, 242, 300, 1)",
                    position: "fixed",
                    top: "65px",
                    width: "calc(100% - 320px)", // Sesuaikan dengan sidebar jika ada
                    zIndex: "1",
                }}
                className="px-3"
            >
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
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-konten-sma/event-sma"
                        style={{
                            color: location.pathname.includes("event-sma") ? "#FFA500" : "black",
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
            </Nav>

            {/* Konten berdasarkan Tab yang diklik */}
            <div className="content-area">
                <Routes>
                    <Route path="visi-misi-tujuan" element={<AdminVisiMisiTujuan />} />
                    <Route path="event-sma" element={<AdminEventSma />} />
                    <Route path="pengumuman-sma" element={<PengumumanAdminSma />} />
                    <Route path="dokumentasi-kegiatan-sma" element={<AdminDokumentasiKegiatan />} />
                    <Route path="fasilitas" element={<Fasilitas />} />
                </Routes>
            </div>
        </div>
    );
}

export default ManajemenKontenSma;