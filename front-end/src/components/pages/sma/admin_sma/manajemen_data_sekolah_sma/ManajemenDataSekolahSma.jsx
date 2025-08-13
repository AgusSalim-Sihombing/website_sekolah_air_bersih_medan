import { Nav } from "react-bootstrap";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import DataGuru from "./data_guru/DataGuru";
import DataSiswaSma from "./data_siswa/DataSiswaSma";
import GrafikSiswaSma from "./data_siswa/grafik_siswa_sma/GrafikSiswaSma";
import DataKelasSma from "./data_siswa/DataKelas";
import DataAlumni from "./data_alumni/DataAlumni";
import GuruTendikAdmin from "./data_guru/GuruTendikAdmin";
import WaliKelasAdminSma from "./wali_kelas/WaliKelasAdminSma";

const ManajemenDataSekolahSma = () => {
    const location = useLocation();

    return (
        <div>
            {/* Navigasi Tab */}
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
                        to="/admin-sma/manajemen-data-sma/grafik-siswa-sma"
                        className="nav-link"
                        style={{
                            color: location.pathname.includes("grafik-siswa-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Grafik Siswa/i SMA
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-data-sma/data-siswa-sma"
                        className="nav-link"
                        style={{
                            color: location.pathname.includes("data-siswa-sma") ? "#FFA500" : "black",
                        }}
                    >
                        Data Siswa/i SMA
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-data-sma/wali-kelas"
                        className="nav-link"
                        style={{
                            color: location.pathname.includes("wali-kelas") ? "#FFA500" : "black",
                        }}
                    >
                        Wali Kelas
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-data-sma/data-guru"
                        className="nav-link"
                        style={{
                            color: location.pathname.includes("data-guru") ? "#FFA500" : "black",
                        }}
                    >
                        Data Guru
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to="/admin-sma/manajemen-data-sma/arsip-alumni"
                        className="nav-link"
                        style={{
                            color: location.pathname.includes("arsip-alumni") ? "#FFA500" : "black",
                        }}
                    >
                        Arsip Alumni
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Routing Konten */}
            <div className="content-area" style={{ marginTop: "100px" }}>
                <Routes>
                    <Route path="data-siswa-sma" element={<DataSiswaSma />} />
                    <Route path="data-siswa-sma/:kelas" element={<DataKelasSma />} />
                    {/* <Route path="data-guru" element={<DataGuru />} /> */}
                    <Route path="data-guru" element={<GuruTendikAdmin />} />
                    <Route path="grafik-siswa-sma" element={<GrafikSiswaSma />} />
                    <Route path="arsip-alumni" element={<DataAlumni />} />
                    <Route path="wali-kelas" element={<WaliKelasAdminSma />} />
                </Routes>
            </div>
        </div>
    );
};

export default ManajemenDataSekolahSma;
