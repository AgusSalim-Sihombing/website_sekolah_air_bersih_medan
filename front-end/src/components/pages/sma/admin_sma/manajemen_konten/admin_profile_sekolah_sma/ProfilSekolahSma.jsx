import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import "./ProfileSekolahSma.css"

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ProfileSekolahSma = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin-sma/profil-sma`);
            setProfile(response.data);
            setFormData(response.data);
            if (response.data?.gambar_denah) {
                setPreview(`data:image/jpeg;base64,${response.data.gambar_denah}`);
            }
        } catch (error) {
            console.error("Gagal mengambil profil:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024; // 1 MB

            if (file.size > maxSize) {
                setMessage("Ukuran gambar maksimal 1 MB");
                setSelectedImage(null);
                setPreview(null);
                return;
            }

            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nama_sekolah || !formData.kepala_sekolah || !formData.alamat) {
            setMessage("Nama sekolah, kepala sekolah, dan alamat wajib diisi");
            return;
        }

        const payload = new FormData();

        // Bandingkan setiap field dan hanya tambahkan jika berubah
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== profile[key]) {
                payload.append(key, formData[key]);
            }
        });

        // Hanya tambahkan gambar jika admin memilih gambar baru
        if (selectedImage) {
            payload.append("gambar_denah", selectedImage);
        }

        if ([...payload.keys()].length === 0) {
            setMessage("Tidak ada perubahan yang dilakukan.");
            return;
        }

        try {
            await axios.put(`${API_URL}/admin-sma/profil-sma/${profile.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Profil berhasil diperbarui");
            fetchProfile();
        } catch (error) {
            console.error("Gagal update:", error);
            setMessage("Gagal memperbarui profil");
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">🛠️ Edit Profil Sekolah</h4>

            {message && <Alert variant="info">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Sekolah</Form.Label>
                            <Form.Control
                                name="nama_sekolah"
                                value={formData.nama_sekolah || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kepala Sekolah</Form.Label>
                            <Form.Control
                                name="kepala_sekolah"
                                value={formData.kepala_sekolah || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status Sekolah</Form.Label>
                            <Form.Control
                                name="status_sekolah"
                                value={formData.status_sekolah || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kepemilikan</Form.Label>
                            <Form.Control
                                name="status_kepemilikan"
                                value={formData.status_kepemilikan || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>NSS</Form.Label>
                            <Form.Control
                                name="nss"
                                value={formData.nss || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="alamat"
                                value={formData.alamat || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                name="kota"
                                value={formData.kota || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                name="provinsi"
                                value={formData.provinsi || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kelurahan</Form.Label>
                            <Form.Control
                                name="kelurahan"
                                value={formData.kelurahan || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                name="kecamatan"
                                value={formData.kecamatan || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telepon</Form.Label>
                            <Form.Control
                                name="telepon"
                                value={formData.telepon || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                                name="website"
                                value={formData.website || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gambar Denah Sekolah</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            <Form.Text muted>Ukuran maksimal: 5 MB (jpg/png)</Form.Text>
                            {preview && (
                                <img src={preview} alt="Preview" className="img-fluid mt-2" style={{ maxHeight: "200px" }} />
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="success">
                    Simpan Perubahan
                </Button>
            </Form>
        </div>
    );
};

export default ProfileSekolahSma;
