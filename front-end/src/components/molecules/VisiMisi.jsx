import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import "./style/VisiMisi.css"
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
      if (response.data.length > 0) {
        setVisi(response.data[0].visi);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const getMisi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/misi");
      if (response.data.length > 0) {
        setMisi(response.data[0].misi);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const getTujuan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/tujuan");
      if (response.data.length > 0) {
        setTujuan(response.data[0].tujuan);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  return (
    <div className="vmt">
      <Container className="mt-5">
        <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>

        <section className="section-visi">
          <h2>Visi</h2>
          <div dangerouslySetInnerHTML={{ __html: visi || '<p><Loader /></p>' }} />
        </section>

        <section className="section-misi mt-5">
          <h2>Misi</h2>
          <div dangerouslySetInnerHTML={{ __html: misi || '<p><Loader /></p>' }} />
        </section>

        <section className="section-tujuan mt-5">
          <h2>Tujuan</h2>
          <div dangerouslySetInnerHTML={{ __html: tujuan || '<p><Loader /></p>' }} />
        </section>
      </Container>
    </div>
  );
};

export default VisiMisiTujuan;
