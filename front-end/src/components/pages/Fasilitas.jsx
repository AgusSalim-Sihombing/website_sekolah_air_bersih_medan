import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Fasilitas = () => {
    const [fasilitas, setFasilitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFasilitas, setSelectedFasilitas] = useState(null);

    useEffect(() => {
        getFasilitas();
    }, []);

    const getFasilitas = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin-sma/fasilitas`);
            setFasilitas(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (fasilitas) => {
        setSelectedFasilitas(fasilitas);
        setShowModal(true);
    };

    const handleDownload = () => {
        if (selectedFasilitas) {
            const link = document.createElement("a");
            link.href = selectedFasilitas.gambar_fasilitas; // URL gambar
            link.download = selectedFasilitas.nama_fasilitas || "fasilitas"; // Nama file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Dokumentasi Kegiatan</h2>
            <div className="row">
                {fasilitas.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card fasilitas-card" onClick={() => handleShowModal(item)}>
                            <img
                                src={item.gambar_fasilitas}
                                alt={item.nama_fasilitas}
                                className="card-img-top fasilitas-img"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.nama_fasilitas}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Detail Gambar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Fasilitas</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedFasilitas && (
                        <>
                            <img
                                src={selectedFasilitas.gambar_fasilitas}
                                alt={selectedFasilitas.nama_fasilitas}
                                className="img-fluid"
                            />
                            <h5 className="mt-3">{selectedFasilitas.nama_fasilitas}</h5>
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
                .fasilitas-card {
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .fasilitas-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                }
                .fasilitas-img {
                    width: 250px;
                    height: 150px;
                    object-fit: cover;
                    display: block;
                    margin: 0 auto;
                    transition: transform 0.3s ease;
                }
                .fasilitas-card:hover .fasilitas-img {
                    transform: scale(1.1);
                }
                `}
            </style>
        </div>
    );
}

export default Fasilitas;

