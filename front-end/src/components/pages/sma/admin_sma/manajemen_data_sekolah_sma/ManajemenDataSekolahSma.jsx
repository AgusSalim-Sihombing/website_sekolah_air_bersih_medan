import DataGuru from "./data_guru/DataGuru";
import DataSiswaSma from "./data_siswa/DataSiswaSma";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import GrafikSiswaSma from "./data_siswa/grafik_siswa_sma/GrafikSiswaSma";
import DataKelasSma from "./data_siswa/DataKelas";

const ManajemenDataSekolahSma = () => {
    const location = useLocation();

    return (
        <div>
            <div>
                <div >
                    {/* Header Kedua */}
                    <div className="header-second" style={{
                        backgroundColor: "rgba(242, 242, 300, 1)",
                        width: "calc(100% - 320px)",
                        display: "flex",
                        gap: "20px",
                        position: "fixed",
                        zIndex: "1",
                        // width:"100%",
                        height:"50px",
                        top:"65px",
                        padding:"20px",
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:"3"
                    }} >
                        <div>
                            <Link
                                to="/admin-sma/manajemen-data-sma/grafik-siswa-sma"
                                className="nav-link"
                                style={{ color: location.pathname.includes("grafik-siswa-sma") ? "#FFA500" : "black" }}
                            >
                                Grafik Siswa/i SMA
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/admin-sma/manajemen-data-sma/data-siswa-sma"
                                className="nav-link"
                                style={{ color: location.pathname.includes("data-siswa-sma") ? "#FFA500" : "black" }}
                            >
                                Data Siswa/i SMA
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/admin-sma/manajemen-data-sma/data-guru"
                                className="nav-link"
                                style={{ color: location.pathname.includes("data-guru") ? "#FFA500" : "black" }}
                            >
                                Data Guru
                            </Link>
                        </div>

                    </div>

                    {/* Routing untuk sub-halaman Manajemen Konten */}
                    <div className="content-area">
                        <Routes>
                            <Route path="data-siswa-sma" element={<DataSiswaSma />} />
                            <Route path="data-siswa-sma/:kelas" element={<DataKelasSma />} />
                            <Route path="data-guru" element={<DataGuru />} />
                            <Route path="grafik-siswa-sma" element={<GrafikSiswaSma />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManajemenDataSekolahSma;
