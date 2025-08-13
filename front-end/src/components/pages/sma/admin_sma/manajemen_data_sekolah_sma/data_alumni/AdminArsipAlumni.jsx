import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ArsipAlumniAdmin = () => {
  const [tahunList, setTahunList] = useState([]);
  const [selectedTahunId, setSelectedTahunId] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, nama: "", status_keterangan: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTahunList();
  }, []);

  useEffect(() => {
    if (selectedTahunId) {
      fetchAlumni(selectedTahunId);
    }
  }, [selectedTahunId]);

  const fetchTahunList = async () => {
    const res = await axios.get(`${API_URL}/public/arsip-tahun`);
    setTahunList(res.data);
    if (res.data.length > 0) setSelectedTahunId(res.data[0].id);
  };

  const fetchAlumni = async (id) => {
    const res = await axios.get(`${API_URL}/public/arsip-alumni/${id}`);
    setAlumniList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`${API_URL}/public/arsip-alumni/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Alumni diperbarui");
      } else {
        await axios.post(`${API_URL}/public/arsip-alumni`, {
          ...form,
          id_arsip_tahun: selectedTahunId,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Alumni ditambahkan");
      }
      setShowModal(false);
      setForm({ id: null, nama: "", status_keterangan: "" });
      fetchAlumni(selectedTahunId);
    } catch {
      setMessage("❌ Gagal menyimpan alumni");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus alumni ini?")) return;
    await axios.delete(`${API_URL}/public/arsip-alumni/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAlumni(selectedTahunId);
    setMessage("🗑️ Alumni dihapus");
  };

  const openEdit = (alumni) => {
    setForm(alumni);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h4>👨‍🎓 Data Alumni Berdasarkan Tahun</h4>

      <Form.Group className="mb-3">
        <Form.Label>Pilih Tahun</Form.Label>
        <Form.Select onChange={(e) => setSelectedTahunId(e.target.value)} value={selectedTahunId}>
          {tahunList.map((t) => (
            <option key={t.id} value={t.id}>{t.tahun} ({t.program_studi})</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button className="mb-3" onClick={() => {
        setForm({ id: null, nama: "", status_keterangan: "" });
        setShowModal(true);
      }}>
        ➕ Tambah Alumni
      </Button>

      {message && <Alert variant="info">{message}</Alert>}

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {alumniList.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.nama}</td>
              <td>{a.status_keterangan || '-'}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => openEdit(a)}>✏️</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(a.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{form.id ? "Edit Alumni" : "Tambah Alumni"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nama Alumni</Form.Label>
              <Form.Control value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status Keterangan</Form.Label>
              <Form.Control
                value={form.status_keterangan || ""}
                onChange={(e) => setForm({ ...form, status_keterangan: e.target.value })}
                placeholder="Contoh: (+) jika wafat"
              />
            </Form.Group>
            <Button type="submit" variant="primary">💾 Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ArsipAlumniAdmin;
