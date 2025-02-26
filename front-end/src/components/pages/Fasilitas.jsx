import React, { useEffect, useState } from "react"
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from "axios"
import JajaranPengurus from "../molecules/JajaranPengurus";


const Fasilitas = () => {
    const [foto, setFoto] = useState(null)

    useEffect(() => {
        getFoto();
    }, []);
    const getFoto = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/kepala-sekolah-sma");
            if (response.data.length > 0) {
                const data = response.data[0]; // Ambil data pertama

                if (data.foto) {
                    setFoto(`data:image/jpeg;base64,${data.foto}`); // Set foto dari Base64
                }
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };
    return (
        // <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        //     <h1 className="text-xl font-bold text-center">Fasilitas Advent Jalan Air Bersih Medan</h1>
        //     {foto && <img src={foto} alt="Kepala Sekolah" className="w-32 h-32 rounded-full mx-auto my-4" />}

        // </div>
        <Container>
            <h2 className="text-center mt-5 mb-4">Fasilitas Sekolah Advent jalan Air Bersih Medan</h2>

            <Row className="justify-content-md-center">
                <Col md="auto" className="mb-2 ketua-yayasan">
                    <Image src={foto} fluid alt="Ketua Yayasan" />
                    
                </Col>
                <Col md="auto" className="mb-5">
                    <Image src="https://placehold.co/300x400" fluid alt="Pengawas Yayasan" />
                    
                </Col>
                <Col md="auto" className="mb-4">
                    <Image src="https://placehold.co/300x400" fluid alt="Anggota Pengawas Yayasan" />
                    
                </Col>
            </Row>
        </Container>

        // <JajaranPengurus/>
    );
}

export default Fasilitas;

