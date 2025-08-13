import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const WaliKelasAdminSma = () => {
    const [data, setData] = useState([]);
    const [guru, setGuru] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ guru_id: "", kelas: "" });
    const [editId, setEditId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

    const token = localStorage.getItem("token");
    const unitSekolah = localStorage.getItem("unit_sekolah"); // Ambil unit dari localStorage

    useEffect(() => {
        fetchWaliKelas();
        fetchGuru();
    }, []);

    const fetchWaliKelas = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/public/wali-kelas`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchGuru = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/public/guru-tendik`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGuru(res.data);
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        
        try {
            const payload = {
                guru_id: formData.guru_id,
                kelas: formData.kelas,
                unit_sekolah: unitSekolah
            };

            if (editId) {
                const response = await axios.put(`${API_BASE_URL}/public/wali-kelas/${editId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotif(response.data.message, "success");
            } else {
                const response = await axios.post(`${API_BASE_URL}/public/wali-kelas`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotif(response.data.message, "success");
            }

            setShowModal(false);
            setFormData({ guru_id: "", kelas: "" });
            setEditId(null);
            fetchWaliKelas();
        } catch (err) {
            console.error(err);
            showNotif(err.response?.data?.message || "Gagal menyimpan data.", "danger");
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/public/wali-kelas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotif(response.data.message, "success");
                fetchWaliKelas();
            } catch (err) {
                console.error(err);
                showNotif(err.response?.data?.message || "Gagal menghapus data.", "danger");
            }
        }
    };

    const showNotif = (message, variant = "success") => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    return (
        <div>
            <h4>Manajemen Wali Kelas</h4>
            <Button onClick={() => {
                setShowModal(true);
                setEditId(null);
                setFormData({ guru_id: "", kelas: "" });
            }}>
                Tambah Wali Kelas
            </Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kelas</th>
                        <th>Nama Guru</th>
                        <th>Unit</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.kelas}</td>
                            <td>{item.nama_guru}</td>
                            <td>{item.unit_sekolah}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleSubmit(item)}>Edit</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                bg={toastVariant}
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    minWidth: "250px",
                    zIndex: 9999,
                }}
            >
                <Toast.Header closeButton>
                    <strong className="me-auto">Informasi</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{toastMessage}</Toast.Body>
            </Toast>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Wali Kelas" : "Tambah Wali Kelas"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pilih Guru</Form.Label>
                            <Form.Select name="guru_id" value={formData.guru_id} onChange={handleInputChange} required>
                                <option value="">-- Pilih Guru --</option>
                                {guru.map((g) => (
                                    <option key={g.id} value={g.id}>{g.nama}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pilih Kelas</Form.Label>
                            <Form.Select name="kelas" value={formData.kelas} onChange={handleInputChange} required>
                                <option value="">-- Pilih Kelas --</option>
                                <option value="VII">VII</option>
                                <option value="VIII_A">VIII - A</option>
                                <option value="VIII_B">VIII - B</option>
                                <option value="IX_A">IX - A</option>
                                <option value="IX_B">IX - B</option>
                                <option value="X_1">X - 1</option>
                                <option value="X_2">X - 2</option>
                                <option value="XI_IPA">XI - IPA</option>
                                <option value="XII_IPA">XII - IPA</option>
                                <option value="XII_IPS">XII - IPS</option>
                                <option value="X_TKJ">X - TKJ</option>
                                <option value="XI_TKJ">XI - TKJ</option>
                                <option value="XII">XII - SMK</option>
                            </Form.Select>
                        </Form.Group>

                        <Button type="submit" className="mt-3">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default WaliKelasAdminSma;
