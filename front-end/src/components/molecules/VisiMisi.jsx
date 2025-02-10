import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "../../styles/molecules/VisiMisi.css"

const VisiMisiTujuan = () => {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState([]);
  const [tujuan, setTujuan] = useState([]);



  useEffect(() => {
    getVisi();
    getMisi();
    getTujuan();
  }, []);


  const getVisi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/visi");
      console.log("Response dari API:", response.data);
      if (response.data.length > 0) {
        const data = response.data[0];
        setVisi(data.visi);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const getMisi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/misi")
      // console.log("Response dari API:", response.data);

      if (Array.isArray(response.data)) {
        const data = response.data;
        setMisi(data)
      } else {
        setMisi([])
      }

    } catch (error) {
      console.log("Gagal Mengambil data :", error)
      setMisi([])
    }
  }

  const getTujuan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/tujuan")
      // console.log("Response dari API:", response.data);

      if (Array.isArray(response.data)) {
        const data = response.data;
        setTujuan(data)
      } else {
        setTujuan([])
      }
    } catch (error) {
      console.log("Gagal Mengambil data :", error)
      setTujuan([])
    }
  }


  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4 costum-card">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Visi</h2>
            </div>
            <div className="card-body costum">
              <p>{visi ? visi : "Memuat visi..."}</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Misi</h2>
            </div>
            <div className="card-body costum">
              <ul className="costum-list">
                {misi?.length > 0 ? ( // Optional Chaining agar tidak error
                  misi.map((item, index) => (
                    <li key={index} >
                      {item.misi}
                    </li>
                  ))
                ) : (
                  <p>Memuat Misi...</p> // Pesan loading jika data masih kosong
                )}
              </ul>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Tujuan</h2>
            </div>
            <div className="card-body costum">
              <ul className="costum-list">
                {tujuan?.length > 0 ? ( // Optional Chaining agar tidak error
                  tujuan.map((item, index) => (
                    <li key={index} >
                      {item.tujuan}
                    </li>
                  ))
                ) : (
                  <p>Memuat Tujuan...</p> // Pesan loading jika data masih kosong
                )}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VisiMisiTujuan;