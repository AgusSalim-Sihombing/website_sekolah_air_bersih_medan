import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import "../../styles/molecules/JajaranPengurus.css"

const JajaranPengurus = () => {
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
    <Container>
      <h2 className="text-center mt-5 mb-4">Jajaran Pengurus Yayasan</h2>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-2 ketua-yayasan">
          <Image src={foto} fluid alt="Ketua Yayasan" />
          <h5 className="text-center mt-2">Ketua Yayasan</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-4">
          <Image src="https://placehold.co/300x400" fluid alt="Bendahara Yayasan" />
          <h5 className="text-center mt-2">Bendahara Yayasan</h5>
        </Col>
        <Col md="auto" className="mb-5">
          <Image src="https://placehold.co/300x400" fluid alt="Pengawas Yayasan" />
          <h5 className="text-center mt-2">Pengawas Yayasan</h5>
        </Col>
        <Col md="auto" className="mb-4">
          <Image src="https://placehold.co/300x400" fluid alt="Anggota Pengawas Yayasan" />
          <h5 className="text-center mt-2">Anggota Pengawas Yayasan</h5>
        </Col>
      </Row>
    </Container>
  );
};
export default JajaranPengurus;