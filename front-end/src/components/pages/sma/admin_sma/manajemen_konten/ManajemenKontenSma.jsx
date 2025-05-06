import AdminDokumentasiKegiatan from "./admin_dokumentasi_kegiatan/AdminDokumentasiKegiatan";
import AdminEventSma from "./admin_event_sma/AdminEventSma";
import Fasilitas from "./admin_fasilitas/Fasilitas";
import PengumumanAdminSma from "./admin_pengumunan_sma/PengumumanAdminSma";
import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import { Routes, Route, Link, useLocation } from "react-router-dom";

const ManajemenKontenSma = () => {
    const location = useLocation();
    return (
        <div>
            <div>
                {/* Header Kedua */}
                <div>
                    <div className="header-second" style={{
                        backgroundColor: "rgba(242, 242, 300, 1)",
                        width: "calc(100% - 320px)",
                        display: "flex",
                        gap: "20px",
                        position: "fixed",
                        zIndex: "1",
                        // width:"100%",
                        height: "50px",
                        top: "65px",
                        padding: "20px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "3"
                    }} >
                        <div>
                            <Link
                                to="/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
                                className="nav-link"
                                style={{ color: location.pathname.includes("visi-misi-tujuan") ? "#FFA500" : "black" }}
                            >
                                Visi-Misi-Tujuan
                            </Link>
                        </div>

                        <div>
                            <Link
                                to="/admin-sma/manajemen-konten-sma/event-sma"
                                className="nav-link"
                                style={{ color: location.pathname.includes("event-sma") ? "#FFA500" : "black" }}
                            >
                                Event
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/admin-sma/manajemen-konten-sma/pengumuman-sma"
                                className="nav-link"
                                style={{ color: location.pathname.includes("pengumuman-sma") ? "#FFA500" : "black" }}
                            >
                                Pengumuman
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/admin-sma/manajemen-konten-sma/dokumentasi-kegiatan-sma"
                                className="nav-link"
                                style={{ color: location.pathname.includes("dokumentasi-kegiatan-sma") ? "#FFA500" : "black" }}
                            >
                                Dokumentasi Event
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/admin-sma/manajemen-konten-sma/fasilitas"
                                className="nav-link"
                                style={{ color: location.pathname.includes("fasilitas") ? "#FFA500" : "black" }}
                            >
                                Fasilitas
                            </Link>
                        </div>
                    </div>

                    {/* Routing untuk sub-halaman Manajemen Konten */}
                    <div className="content-area">
                        <Routes>
                            <Route path="visi-misi-tujuan" element={<AdminVisiMisiTujuan />} />
                            <Route path="event-sma" element={<AdminEventSma />} />
                            <Route path="pengumuman-sma" element={<PengumumanAdminSma />} />
                            <Route path="dokumentasi-kegiatan-sma" element={< AdminDokumentasiKegiatan />} />
                            <Route path="fasilitas" element={< Fasilitas />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {/* <AdminVisiMisiTujuan />
            <AdminEventSma /> */}
        </div>
    )
}

export default ManajemenKontenSma;