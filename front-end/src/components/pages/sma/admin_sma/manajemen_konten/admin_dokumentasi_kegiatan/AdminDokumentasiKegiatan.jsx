import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";


const AdminDokumentasiKegiatan = () => {
    const [dokumentasi, setDokumentasi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDokumentasi, setSelectedDokumentasi] = useState(null);
    const [formData, setFormData] = useState({ nama_kegiatan: "", tanggal_kegiatan: "", gambar: null });

    useEffect(() => {
        fetchDokumentasi();
    }, []);

    const fetchDokumentasi = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/admin-sma/dokumentasi");
            setDokumentasi(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (dokumentasi = null) => {
        setSelectedDokumentasi(dokumentasi);
        setFormData(dokumentasi ? { nama_kegiatan: dokumentasi.nama_kegiatan, tanggal_kegiatan: dokumentasi.tanggal_kegiatan, gambar: null } : { nama_kegiatan: "", tanggal_kegiatan: "", gambar: null });
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, gambar: e.target.files[0] });
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("nama_kegiatan", formData.nama_kegiatan);
        formDataToSend.append("tanggal_kegiatan", formData.tanggal_kegiatan);

        if (formData.gambar) {
            formDataToSend.append("gambar", formData.gambar);
        } else {
            formDataToSend.append("gambarLama", formData.gambarLama);
        }

        try {
            if (selectedDokumentasi) {
                await axios.put(`http://localhost:3001/api/admin-sma/dokumentasi/${selectedDokumentasi.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("http://localhost:3001/api/admin-sma/dokumentasi", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setShowModal(false);
            fetchDokumentasi();
        } catch (error) {
            console.error("Error saving dokumentasi:", error);
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus dokumentasi ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/admin-sma/dokumentasi/${id}`);
                fetchDokumentasi();
            } catch (error) {
                console.error("Error deleting dokumentasi:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Dokumentasi Kegiatan</h2>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Tambah Dokumentasi</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kegiatan</th>
                        <th>Tanggal Kegiatan</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dokumentasi.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_kegiatan}</td>
                            <td>{item.tanggal_kegiatan ? format(new Date(item.tanggal_kegiatan), "dd MMMM yyyy", { locale: idLocale }) : "-"}</td>
                            <td >
                                {item.gambar && <img src={item.gambar} alt={item.nama_kegiatan} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                }
                            </td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleShowModal(item)} className="me-2">
                                    <Icon.Pen />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                    <Icon.Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal untuk Tambah/Edit Dokumentasi */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedDokumentasi ? "Edit Dokumentasi" : "Tambah Dokumentasi"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kegiatan</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.nama_kegiatan}
                                onChange={(e) => setFormData({ ...formData, nama_kegiatan: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Kegiatan</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.tanggal_kegiatan ? format(new Date(formData.tanggal_kegiatan), "yyyy-MM-dd", { locale: idLocale }) : "-"}
                                onChange={(e) => setFormData({ ...formData, tanggal_kegiatan: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Gambar</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleSave}>{selectedDokumentasi ? "Update" : "Tambah"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminDokumentasiKegiatan;