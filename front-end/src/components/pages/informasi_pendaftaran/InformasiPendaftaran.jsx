import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Container, Button, Row, Col } from "react-bootstrap";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const InformasiPendaftaran = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInformasi = async () => {
            try {
                const res = await axios.get(`${API_URL}/public/informasi-pendaftaran`);
                setData(res.data);
            } catch (err) {
                console.error("Gagal mengambil informasi pendaftaran:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInformasi();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!data) {
        return <p className="text-center">Tidak ada informasi pendaftaran saat ini.</p>;
    }

    return (
        <div>
            {/* Judul */}
            <div className="py-4 text-center">
                <h1 className="fw-bold mb-0">INFORMASI PENDAFTARAN</h1>
            </div>

            {/* Gambar Potret Full Width */}
            {data.gambar && (
                <div style={{ width: "100%", height:"100%", overflow: "hidden" }}>
                    <img
                        src={`data:image/jpeg;base64,${data.gambar}`}
                        alt="Gambar Informasi Pendaftaran"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </div>
            )}

            {/* Teks Syarat */}
            <Container className="py-5">
                
                <h3 className="text-center mb-4 fw-bold text-primary">📄 Syarat Pendaftaran</h3>
                <div
                    dangerouslySetInnerHTML={{ __html: data.syarat }}
                    style={{
                        lineHeight: "1.8",
                        fontSize: "1.1rem",
                        padding: "10px 15px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "10px",
                        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                    }}
                />

                {/* Tombol Daftar */}
                <div className="mt-5 text-center">
                    <h4 className="mb-3 fw-semibold">Pilih Unit Untuk Daftar:</h4>
                    <Row className="justify-content-center gap-3">
                        <Col xs="auto">
                            <Button variant="success" href="https://link-pendaftaran-sma.com" target="_blank">
                                Daftar SMA
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="info" href="https://link-pendaftaran-smp.com" target="_blank">
                                Daftar SMP
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="warning" href="https://link-pendaftaran-smk.com" target="_blank">
                                Daftar SMK
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default InformasiPendaftaran;
