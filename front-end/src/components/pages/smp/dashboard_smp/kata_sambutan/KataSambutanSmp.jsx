

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const KataSambutanSmp = () => {
  const [sambutan, setSambutan] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState("");

  useEffect(() => {
    fetchSambutan();
  }, []);

  const fetchSambutan = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin-sma/get-kata-sambutan-sma`);
      setNamaKepsek(res.data.nama_kepala_sekolah || "");
      setSambutan(res.data.sambutan || "");
      if (res.data.foto_kepala) {
        setFotoKepsek(`data:image/jpeg;base64,${res.data.foto_kepala}`);
      }
    } catch (err) {
      console.error("Gagal mengambil kata sambutan:", err);
    }
  };

  const truncateText = (text, maxLength = 500) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={4} className="text-center mb-4 mb-md-0">
          {fotoKepsek && (
            <Image
              src={fotoKepsek}
              fluid
              rounded
              style={{ maxHeight: "300px", borderRadius: "12px" }}
            />
          )}
          <h5 className="mt-3">{namaKepsek}</h5>
          <p className="text-muted">Kepala Sekolah</p>
        </Col>
        <Col md={8}>
          <h3 className="mb-3">Kata Sambutan Kepala Sekolah</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: truncateText(sambutan),
            }}
            style={{
              textAlign:"justify"
            }}
          ></div>
          <Button variant="outline-primary" className="mt-3" href="/sma/kata-sambutan">
            Baca Selengkapnya &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default KataSambutanSmp;
