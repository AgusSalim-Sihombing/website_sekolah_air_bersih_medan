import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./DetailKataSambutan.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DetailKataSambutan = () => {
  const [data, setData] = useState({
    nama_kepala_sekolah: "",
    sambutan: "",
    foto_kepala: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin-sma/get-kata-sambutan-sma`);
        setData({
          nama_kepala_sekolah: res.data.nama_kepala_sekolah || "",
          sambutan: res.data.sambutan || "",
          foto_kepala: res.data.foto_kepala
            ? `data:image/jpeg;base64,${res.data.foto_kepala}`
            : null,
        });
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="parallax-wrapper">
      <div className="parallax-bg" />
      <div className="content-overlay">
        <h2 className="title">Kata Sambutan Kepala Sekolah SMA</h2>
        <div className="profile-container">
          {data.foto_kepala && (
            <Image src={data.foto_kepala} fluid rounded className="kepsek-img" />
          )}
          <h5 className="kepsek-name mt-2">{data.nama_kepala_sekolah}</h5>
        </div>
        <div
          className="sambutan-text"
          dangerouslySetInnerHTML={{ __html: data.sambutan }}
          style={{
            textAlign:"justify"
          }}
        ></div>
      </div>
    </div>
  );
};

export default DetailKataSambutan;
