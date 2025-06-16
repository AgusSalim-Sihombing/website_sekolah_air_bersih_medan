import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { Download } from "react-bootstrap-icons"; // Import ikon download
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DokumentasiKegiatan = () => {
    const [dokumentasi, setDokumentasi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDokumentasi, setSelectedDokumentasi] = useState(null);

    useEffect(() => {
        fetchDokumentasi();
    }, []);

    const fetchDokumentasi = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/admin-sma/dokumentasi");
            setDokumentasi(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (dokumentasi) => {
        setSelectedDokumentasi(dokumentasi);
        setShowModal(true);
    };

    const handleDownload = () => {
        if (selectedDokumentasi) {
            const link = document.createElement("a");
            link.href = selectedDokumentasi.gambar; // URL gambar
            link.download = selectedDokumentasi.nama_kegiatan || "dokumentasi"; // Nama file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Dokumentasi Kegiatan</h2>
            <div className="row">
                {dokumentasi.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card dokumentasi-card" onClick={() => handleShowModal(item)}>
                            <img
                                src={item.gambar}
                                alt={item.nama_kegiatan}
                                className="card-img-top dokumentasi-img"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.nama_kegiatan}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Detail Gambar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Dokumentasi</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedDokumentasi && (
                        <>
                            <img
                                src={selectedDokumentasi.gambar}
                                alt={selectedDokumentasi.nama_kegiatan}
                                className="img-fluid"
                            />
                            <h5 className="mt-3">{selectedDokumentasi.nama_kegiatan}</h5>
                            <p>
                                {selectedDokumentasi.tanggal_kegiatan
                                    ? format(new Date(selectedDokumentasi.tanggal_kegiatan), "dd MMMM yyyy", { locale: idLocale })
                                    : "-"}
                            </p>
                            {/* Ikon Download */}
                            <button className="btn btn-primary mt-2" onClick={handleDownload}>
                                <Download size={20} className="me-2" />
                                Download Gambar
                            </button>
                        </>
                    )}
                </Modal.Body>
            </Modal>

            {/* CSS untuk mengatur ukuran gambar & efek hover */}
            <style>
                {`
                .dokumentasi-card {
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .dokumentasi-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                }
                .dokumentasi-img {
                    width: 250px;
                    height: 150px;
                    object-fit: cover;
                    display: block;
                    margin: 0 auto;
                    transition: transform 0.3s ease;
                }
                .dokumentasi-card:hover .dokumentasi-img {
                    transform: scale(1.1);
                }
                `}
            </style>
        </div>
    );
};

export default DokumentasiKegiatan;
