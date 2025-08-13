import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";



const Fasilitas = () => {
    const [fasilitas, setFasilitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFasilitas, setSelectedFasilitas] = useState(null);
    const [formData, setFormData] = useState({
        nama_fasilitas: "",
        deskripsi: "",
        gambar_fasilitas: null,
    });

    useEffect(() => {
        getFasilitas();
    }, []);

    const getFasilitas = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/admin-sma/fasilitas");
            setFasilitas(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (fasilitas = null) => {
        setSelectedFasilitas(fasilitas);
        setFormData(fasilitas ? {
            nama_fasilitas: fasilitas.nama_fasilitas, deskripsi: fasilitas.deskripsi, gambar_fasilitas: null
        } : {
            nama_fasilitas: "",
            deskripsi: "",
            gambar_fasilitas: null
        });
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, gambar_fasilitas: e.target.files[0] });
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("nama_fasilitas", formData.nama_fasilitas);
        formDataToSend.append("deskripsi", formData.deskripsi);

        if (formData.gambar_fasilitas) {
            formDataToSend.append("gambar_fasilitas", formData.gambar_fasilitas);
        } else {
            formDataToSend.append("gambarLama", formData.gambarLama); // Kirim gambar lama jika tidak ada perubahan
        }

        try {
            if (selectedFasilitas) {
                await axios.put(`http://localhost:3001/api/admin-sma/fasilitas/${selectedFasilitas.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("http://localhost:3001/api/admin-sma/fasilitas", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setShowModal(false);
            getFasilitas();
        } catch (error) {
            console.error("Error saving fasilitas:", error);
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/admin-sma/fasilitas/${id}`);
                getFasilitas();
                alert("Fasilitas Berhasil Di Hapus")
            } catch (error) {
                console.error("Error deleting fasilitas:", error);
            }
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Fasilitas</h2>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Tambah Fasilitas</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Fasilitas</th>
                        <th>Deskripsi</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {fasilitas.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_fasilitas}</td>
                            <td>{item.deskripsi}</td>
                            <td >
                                {item.gambar_fasilitas && <img src={item.gambar_fasilitas} alt={item.nama_fasilitas} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
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

            {/* Modal untuk Tambah/Edit Fasilitas */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedFasilitas ? "Edit Fasilitas" : "Tambah Fasilitas"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Fasilitas</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.nama_fasilitas}
                                onChange={(e) => setFormData({ ...formData, nama_fasilitas: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Fasilitas</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.deskripsi}
                                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
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
                    <Button variant="primary" onClick={handleSave}>{selectedFasilitas ? "Update" : "Tambah"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Fasilitas;