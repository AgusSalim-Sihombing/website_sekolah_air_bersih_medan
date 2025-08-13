import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner, Image } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const InformasiPendaftaranAdmin = () => {
  const [syarat, setSyarat] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [dataId, setDataId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInformasi();
  }, []);

  const fetchInformasi = async () => {
    try {
      const res = await axios.get(`${API_URL}/public/informasi-pendaftaran`);
      if (res.data) {
        setSyarat(res.data.syarat);
        setPreview(`data:image/jpeg;base64,${res.data.gambar}`);
        setDataId(res.data.id);
      }
    } catch (err) {
      console.error("Gagal memuat data informasi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("syarat", syarat);
    if (gambar) formData.append("gambar", gambar);

    try {
      const url = dataId
        ? `${API_URL}/public/informasi-pendaftaran/${dataId}`
        : `${API_URL}/public/informasi-pendaftaran`;

      const method = dataId ? "put" : "post";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Informasi berhasil disimpan.");
      fetchInformasi();
    } catch (err) {
      console.error("Gagal menyimpan informasi:", err);
      setMessage("❌ Gagal menyimpan informasi.");
    }
  };

  const handleDelete = async () => {
    if (!dataId) return;
    try {
      await axios.delete(`${API_URL}/public/informasi-pendaftaran/${dataId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSyarat("");
      setPreview(null);
      setGambar(null);
      setDataId(null);
      setMessage("🗑️ Informasi berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus informasi:", err);
      setMessage("❌ Gagal menghapus informasi.");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📝 Informasi Pendaftaran</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          {message && <Alert variant="info">{message}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Gambar Potret (Full Width)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setGambar(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {preview && (
              <Image
                src={preview}
                className="mt-2"
                fluid
                style={{ maxHeight: "300px", borderRadius: "8px" }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Syarat Pendaftaran</Form.Label>
            <ReactQuill theme="snow" value={syarat} onChange={setSyarat} />
          </Form.Group>

          <Button variant="success" type="submit" className="me-2">
            💾 Simpan
          </Button>
          {dataId && (
            <Button variant="danger" onClick={handleDelete}>
              🗑️ Hapus
            </Button>
          )}
        </Form>
      )}
    </div>
  );
};

export default InformasiPendaftaranAdmin;