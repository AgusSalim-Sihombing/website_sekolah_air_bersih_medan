import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ArsipTahunAdmin = () => {
    const [dataTahun, setDataTahun] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ id: null, tahun: "", program_studi: "Campuran", kepala_sekolah: "" });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTahun();
    }, []);

    const fetchTahun = async () => {
        try {
            const res = await axios.get(`${API_URL}/public/arsip-tahun`);
            setDataTahun(res.data);
        } catch (err) {
            console.error("Gagal mengambil data tahun", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await axios.put(`${API_URL}/public/arsip-tahun/${form.id}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage("✅ Tahun arsip diperbarui");
            } else {
                await axios.post(`${API_URL}/public/arsip-tahun`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage("✅ Tahun arsip ditambahkan");
            }
            setShowModal(false);
            setForm({ id: null, tahun: "", program_studi: "Campuran", kepala_sekolah: "" });
            fetchTahun();
        } catch (err) {
            console.error(err);
            setMessage("❌ Gagal menyimpan data");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus data ini?")) return;
        try {
            await axios.delete(`${API_URL}/public/arsip-tahun/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTahun();
            setMessage("🗑️ Tahun arsip dihapus");
        } catch (err) {
            console.error(err);
        }
    };

    const openEdit = (item) => {
        setForm(item);
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
            <h4>📁 Data Arsip Tahun Alumni</h4>
            <Button className="mb-3" onClick={() => {
                setForm({ id: null, tahun: "", program_studi: "Campuran", kepala_sekolah: "" });
                setShowModal(true);
            }}>
                ➕ Tambah Tahun
            </Button>

            {message && <Alert variant="info">{message}</Alert>}

            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tahun</th>
                        <th>Program Studi</th>
                        <th>Kepala Sekolah</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTahun.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.tahun}</td>
                            <td>{item.program_studi}</td>
                            <td>{item.kepala_sekolah}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => openEdit(item)}>✏️</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Tambah/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{form.id ? "Edit Tahun Arsip" : "Tambah Tahun Arsip"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.tahun}
                                onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Program Studi</Form.Label>
                            <Form.Select
                                value={form.program_studi}
                                onChange={(e) => setForm({ ...form, program_studi: e.target.value })}
                            >
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="Campuran">Campuran</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Kepala Sekolah</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.kepala_sekolah}
                                onChange={(e) => setForm({ ...form, kepala_sekolah: e.target.value })}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">💾 Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ArsipTahunAdmin;
