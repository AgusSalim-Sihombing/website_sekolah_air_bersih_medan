import React, { useEffect, useState } from "react";
import axios from "axios";
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
      link.href = selectedFasilitas.gambar_fasilitas;
      link.download = selectedFasilitas.nama_fasilitas || "fasilitas";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container py-5" style={{ background: "#f7f9fc", minHeight: "100vh" }}>
      <h2 className="text-center fw-bold mb-4">Dokumentasi Fasilitas Sekolah</h2>
      <div className="row">
        {fasilitas.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div
              className="card fasilitas-card shadow-sm border-0"
              onClick={() => handleShowModal(item)}
            >
              <img
                src={item.gambar_fasilitas}
                alt={item.nama_fasilitas}
                className="card-img-top fasilitas-img"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-dark">{item.nama_fasilitas}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Gambar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFasilitas?.nama_fasilitas}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedFasilitas && (
            <>
              <img
                src={selectedFasilitas.gambar_fasilitas}
                alt={selectedFasilitas.nama_fasilitas}
                className="img-fluid rounded mb-3"
              />
              <p>{selectedFasilitas.deskripsi}</p>
              <button className="btn btn-outline-primary" onClick={handleDownload}>
                <Download size={20} className="me-2" />
                Download Gambar
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Inline Styling */}
      <style>{`
        .fasilitas-card {
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: white;
        }

        .fasilitas-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }

        .fasilitas-img {
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .fasilitas-card:hover .fasilitas-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Fasilitas;
