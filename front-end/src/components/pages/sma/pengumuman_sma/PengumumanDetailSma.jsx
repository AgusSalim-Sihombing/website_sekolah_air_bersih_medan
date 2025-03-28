import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const DetailPengumumanSma = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pengumuman, setPengumuman] = useState(null);

    useEffect(() => {
        fetchDetailPengumuman();
    }, []);

    const fetchDetailPengumuman = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin-sma/pengumuman-sma/${id}`);
            setPengumuman(response.data);
        } catch (error) {
            console.error("Error fetching detail pengumuman:", error);
        }
    };

    if (!pengumuman) {
        return <p className="text-center mt-5">Memuat detail pengumuman...</p>;
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <h4>Detail Pengumuman</h4>
            <Container className="p-5">
                <Card className="p-2">
                    <h2>{pengumuman.judul}</h2>
                    <p className="text-muted">
                        {pengumuman.tanggal
                            ? format(new Date(pengumuman.tanggal), "dd MMM yyyy, HH:mm", { locale: idLocale })
                            : "-"}
                    </p>
                    <p>{pengumuman.isi}</p>
                </Card>
            </Container>
        </div>
    );
};

export default DetailPengumumanSma;
