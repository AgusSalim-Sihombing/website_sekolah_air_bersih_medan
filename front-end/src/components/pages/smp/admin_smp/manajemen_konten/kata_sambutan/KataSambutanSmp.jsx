import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const KataSambutanSmp = () => {
  const [sambutan, setSambutan] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [idSambutan, setIdSambutan] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/smp/get-kata-sambutan-smp`);
      if (res.data) {
        setNamaKepsek(res.data.nama_kepala_sekolah || "");
        setSambutan(res.data.sambutan || "");
        setIdSambutan(res.data.id); // Simpan ID untuk update
        if (res.data.foto_kepala) {
          setPreview(`data:image/jpeg;base64,${res.data.foto_kepala}`);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_kepala_sekolah", namaKepsek);
    formData.append("sambutan", sambutan);
    if (fotoKepsek) {
      formData.append("foto_kepala", fotoKepsek);
    }

    try {
      if (idSambutan) {
        // Update
        await axios.put(`${API_URL}/smp/kata-sambutan-smp/${idSambutan}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Kata sambutan berhasil diperbarui");
        window.confirm("Kata Sambutan Berhasil Diperbaharui");
      } else {
        // Tambah baru
        await axios.post(`${API_URL}/smp/kata-sambutan-smp`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Kata Sambutan Berasil Ditambahkan");
        window.alert("Kata Sambutan Berhasil Ditambahkan")
      }
      fetchData();
    } catch (err) {
      console.error(err);
      setMessage("Gagal menyimpan data");
      window.confirm("")
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📝 Kata Sambutan Kepala Sekolah</h4>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama Kepala Sekolah</Form.Label>
          <Form.Control
            type="text"
            value={namaKepsek}
            onChange={(e) => setNamaKepsek(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kata Sambutan</Form.Label>
          <ReactQuill theme="snow" value={sambutan} onChange={setSambutan} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Foto Kepala Sekolah</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFotoKepsek(file);
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
          {preview && (
            <Image
              src={preview}
              className="mt-3"
              fluid
              style={{ maxHeight: "250px", borderRadius: "10px" }}
            />
          )}
        </Form.Group>

        <Button variant="success" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default KataSambutanSmp;
