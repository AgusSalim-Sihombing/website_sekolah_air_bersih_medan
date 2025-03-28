import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Download } from "react-bootstrap-icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./DataGuru.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DataGuruTendik = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 5 baris * 2 kolom per baris

    useEffect(() => {
        getDataGuru();
    }, []);

    const getDataGuru = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin-sma/get-data-guru`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (data) => {
        setSelectedData(data);
        setShowModal(true);
    };

    const handleDownload = () => {
        if (selectedData) {
            const link = document.createElement("a");
            link.href = selectedData.foto;
            link.download = selectedData.nama || "Foto";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container>
            <h2 className="text-center mb-5">Guru dan Tendik</h2>
            <Row className="row-costum">
                {currentItems.map((item, index) => (
                    <Col key={item.id} md={5} className="mb-4 foto">
                        <div className="card dokumentasi-card" onClick={() => navigate(`/sma/database/data-guru-tendik/${item.id}`)}>
                            {item.foto ? (
                                <img src={item.foto} alt={item.nama} className="card-img-top dokumentasi-img" />
                            ) : (
                                <div className="card-img-top dokumentasi-img">Tidak ada Foto</div>
                            )}
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.nama}</h5>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                </Pagination>
            )}

        </Container>
    );
};

export default DataGuruTendik;
