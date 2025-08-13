import React, { useEffect, useState } from "react";
import { Table, Button, Image, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";


const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const CarouselSma = () => {
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [editImageId, setEditImageId] = useState(null);
    const [editImageFile, setEditImageFile] = useState(null);
    const [judulBaru, setJudulBaru] = useState("");
    const [editJudul, setEditJudul] = useState("");
    const [editCreatedAt, setEditCreatedAt] = useState("");
    const [editPreview, setEditPreview] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [varianText, setVarianText] = useState("")



    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCarouselData();
    }, []);

    const fetchCarouselData = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin-sma/carousel-sma`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCarouselItems(res.data);
        } catch (error) {
            console.error("Gagal mengambil data carousel:", error);
            setVarianText("danger")
            setMessage("Gagal mengambil data dari server");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newImage || !judulBaru) return;

        const formData = new FormData();
        formData.append("judul", judulBaru);
        formData.append("gambar", newImage);

        try {
            await axios.post(`${API_URL}/admin-sma/carousel-sma`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            window.confirm("Gambar Berhasil Ditambahkan")
            setMessage("Gambar berhasil ditambahkan..");
            setNewImage(null);
            setJudulBaru("");
            fetchCarouselData();
            setVarianText("success")
        } catch (err) {
            console.error("Gagal menambahkan gambar:", err);
            window.confirm("Gagal Menambahkan Gambar")
            setVarianText("danger")
            setMessage("Gagal menambahkan gambar");
        }
    };


    const handleUpdateImage = async () => {
        const formData = new FormData();
        formData.append("judul", editJudul);
        if (editImageFile) {
            formData.append("gambar", editImageFile);
        }

        try {
            await axios.put(`${API_URL}/admin-sma/carousel-sma/${editImageId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setVarianText("success")
            setMessage("Gambar berhasil diperbarui");
            setEditImageId(null);
            setEditImageFile(null);
            setEditJudul("");
            setEditPreview(null);
            fetchCarouselData();
            window.confirm("Gambar Berhasil Di Update")
            setShowEditModal(false)
        } catch (err) {
            console.error("Gagal memperbarui gambar:", err);
            setVarianText("danger")
            setMessage("❌ Gagal memperbarui gambar");
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/admin-sma/carousel-sma/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.confirm("Gambar Berhasil Dihapus");
            setVarianText("success");
            setMessage("🗑️ Gambar Berhasil Dihapus");
            fetchCarouselData();

        } catch (err) {
            console.error("Gagal Menghapus Gambar:", err);
            setVarianText("danger");
            setMessage("❌ Gagal Menghapus Gambar");
        }
    };




    return (
        <div className="container mt-4">
            <h4 className="mb-3">Gambar Carousel Landing Page SMA</h4>
            <Form
                onSubmit={handleSubmit}
                className="mb-4"
                encType="multipart/form-data"
            >
                <Form.Group controlId="formFile" className="mb-2">
                    <Form.Label>Pilih Gambar untuk Carousel</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setNewImage(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>📝 Judul Gambar</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan judul gambar"
                        value={judulBaru}
                        onChange={(e) => setJudulBaru(e.target.value)}
                        required
                    />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Tambah Gambar
                </Button>
            </Form>

            {message && <Alert variant={varianText}>{message}</Alert>}

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Preview Gambar</th>
                            <th>Nama File</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carouselItems.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Tidak ada data gambar carousel
                                </td>
                            </tr>
                        ) : (
                            carouselItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image
                                            src={`data:image/jpeg;base64,${item.gambar}`}
                                            thumbnail
                                            style={{ maxWidth: "150px" }}
                                        />
                                    </td>
                                    <td>{item.judul || "-"}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => {
                                                setEditImageId(item.id);
                                                setEditJudul(item.judul || "");
                                                setEditCreatedAt(item.created_at || "");
                                                setEditPreview(`data:image/jpeg;base64,${item.gambar}`);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            ✏️ Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            🗑️ Hapus
                                        </Button>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

            )}


            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🛠️ Edit Gambar Carousel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateImage();
                        }}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control
                                type="text"
                                value={editJudul}
                                onChange={(e) => setEditJudul(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control value={editCreatedAt} readOnly plaintext />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gambar Baru (Opsional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setEditImageFile(e.target.files[0]);
                                    setEditPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                            />
                        </Form.Group>

                        {editPreview && (
                            <Image
                                src={editPreview}
                                thumbnail
                                style={{ maxHeight: "200px" }}
                                className="mb-3"
                            />
                        )}

                        <div className="text-end">
                            <Button variant="secondary" onClick={() => setShowEditModal(false)} className="me-2">
                                ❌ Batal
                            </Button>
                            <Button variant="success" type="submit">
                                💾 Simpan
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default CarouselSma;
