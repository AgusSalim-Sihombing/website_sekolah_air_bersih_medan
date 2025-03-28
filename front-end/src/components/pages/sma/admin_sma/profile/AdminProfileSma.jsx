import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import "../../../../../styles/molecules/JajaranPengurus.css"


const AdminProfileSma = () => {
    const [foto, setFoto] = useState(null);
    const [file, setFile] = useState(null);
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const adminId = 1; // Ganti dengan ID admin yang sesuai

    useEffect(() => {
        getFoto();
    }, []);
    const getFoto = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/kepala-sekolah-sma");
            if (response.data.length > 0) {
                const data = response.data[0]; // Ambil data pertama

                if (data.foto) {
                    setFoto(`data:image/jpeg;base64,${data.foto}`); // Set foto dari Base64
                }
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Pilih file terlebih dahulu!");

        const formData = new FormData();
        formData.append("foto", file);

        try {
            await axios.post(`http://localhost:3001/api/admin/post-photo/${adminId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            getFoto(); // Refresh foto setelah upload
        } catch (error) {
            console.error("Gagal mengunggah foto:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/admin/delete-photo/${adminId}`);
            setFoto(null); // Hapus foto dari state
        } catch (error) {
            console.error("Gagal menghapus foto:", error);
        }
    };

    useEffect(() => {
        getUserAdmin();
    })

    const getUserAdmin = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin-sma/get-admin-sma");
            if (response.data.length > 0) {
                const data = response.data[0];
                setUser(data.username)
                setId(data.id)
            } else {
                setUser("")
            }
        } catch (error) {
            console.error("Gagal mengambil data", error)
            setUser("")
        }
    };

    return (
        <Container>
            <h2 className="text-center mt-5 mb-4">Profile Admin</h2>
            <h6 className="text-center mt-5 mb-4">Halo user :{user ? user : ".."}</h6>
            <h6 className="text-center mt-5 mb-4">Id :{id ? id : ".."}</h6>
            <Row className="justify-content-md-center">
                <Col md="auto" className="mb-2 ketua-yayasan">
                    {foto ? <Image src={foto} fluid alt="admin" /> : <p>Memuat Foto...</p>}

                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <Button variant="primary" onClick={handleUpload} className="mt-2">Upload Foto</Button>
                    <Button variant="danger" onClick={handleDelete} className="mt-2 ms-2">Hapus Foto</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminProfileSma;
