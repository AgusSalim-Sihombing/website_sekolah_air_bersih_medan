import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const PengumumanSma = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        const response = await axios.get(`${API_BASE_URL}/admin-sma/pengumuman-sma`);
        setPengumuman(response.data);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Pengumuman Sekolah</h2>
            {pengumuman.map((item) => (
                <Card
                    key={item.id}
                    className="mb-3 d-flex flex-row align-items-center"
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={() => navigate(`/sma/acara/pengumuman/detail-pengumuman/${item.id}`)}
                >
                    <Card.Body style={{ flex: 1 }}>
                        <Card.Title>{item.judul}</Card.Title>
                        <Card.Text className="text-muted"> Tanggal Publish Pengumuman:
                            {item.tanggal_rilis ? format(new Date(item.tanggal_rilis), "dd MMM yyyy", { locale: idLocale }) : "-"}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default PengumumanSma;
