// src/pages/public/ArsipDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Container, Row, Col, Card } from "react-bootstrap";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ArsipDetail = () => {
    const { id } = useParams();
    const [tahun, setTahun] = useState(null);
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tahunRes, alumniRes] = await Promise.all([
                    axios.get(`${API_URL}/public/arsip-tahun/${id}`),
                    axios.get(`${API_URL}/public/arsip-alumni/${id}`),
                ]);
                setTahun(tahunRes.data);
                setAlumni(alumniRes.data);
            } catch (error) {
                console.error("Gagal mengambil data arsip:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <Container className="my-4">
            <h3>📜 Arsip Alumni Tahun {tahun?.tahun}</h3>
            <p>
                Program Studi: <strong>{tahun?.program_studi}</strong><br />
                Kepala Sekolah: {tahun?.kepala_sekolah || "-"}
            </p>
            <hr />
            <Row>
                {alumni.length === 0 ? (
                    <p>Belum ada data alumni pada tahun ini.</p>
                ) : (
                    alumni.map((a, idx) => (
                        <Col md={4} key={a.id} className="mb-3">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Text className="mb-0">
                                        {idx + 1}. {a.nama} {a.status_keterangan === "(+)" && <span title="Alumni Wafat">🕊️</span>}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default ArsipDetail;
