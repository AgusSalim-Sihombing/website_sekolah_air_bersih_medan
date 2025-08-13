import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./ProfileSma.css";
import { Modal } from "react-bootstrap";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const ProfileSma = () => {
    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin-sma/profil-sma`);
            setProfile(response.data);
        } catch (error) {
            console.error("Gagal mengambil data profil sekolah:", error);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4 border-bottom pb-2">
                🎓 Profil {profile?.nama_sekolah || "Sekolah"}
            </h2>

            <p className="text-center text-muted mb-5">
                Sekolah swasta berbasis yayasan dengan komitmen membentuk karakter unggul dan kompetensi akademik.
            </p>

            {profile && (
                <>
                    <div className="px-3 px-md-5">
                        <Row className="mb-4">
                            <Col md={6}>
                                <div className="profile-row"><strong>🏫 Nama Sekolah:</strong> {profile.nama_sekolah}</div>
                                <div className="profile-row"><strong>👨‍🏫 Kepala Sekolah:</strong> {profile.kepala_sekolah || "-"}</div>
                                <div className="profile-row"><strong>🏷️ Status Sekolah:</strong> {profile.status_sekolah}</div>
                                <div className="profile-row"><strong>📌 Kepemilikan:</strong> {profile.status_kepemilikan}</div>
                                <div className="profile-row"><strong>🏢 NSS:</strong> {profile.nss || "-"}</div>
                                <div className="profile-row"><strong>🏠 Alamat:</strong> {profile.alamat}</div>
                                <div className="profile-row"><strong>📞 Telepon:</strong> {profile.telepon || "-"}</div>
                            </Col>
                            <Col md={6}>
                                <div className="profile-row"><strong>📍 Kelurahan:</strong> {profile.kelurahan}</div>
                                <div className="profile-row"><strong>🧭 Kecamatan:</strong> {profile.kecamatan}</div>
                                <div className="profile-row"><strong>🏙️ Kota:</strong> {profile.kota}</div>
                                <div className="profile-row"><strong>🌍 Provinsi:</strong> {profile.provinsi}</div>
                                <div className="profile-row"><strong>🏫 Bentuk Pendidikan:</strong> {profile.bentuk_pendidikan}</div>
                                <div className="profile-row"><strong>📧 Email:</strong> {profile.email || "-"}</div>
                                <div className="profile-row"><strong>🌐 Website:</strong> {profile.website || "-"}</div>
                            </Col>
                        </Row>
                    </div>

                    {profile.gambar_denah && (
                        <div className="text-center mt-5">
                            <h5 className="mb-3">🗺️ Denah Sekolah</h5>
                            <img
                                src={`data:image/jpeg;base64,${profile.gambar_denah}`}
                                alt="Denah Sekolah"
                                className="img-fluid denah-sekolah shadow"
                                onClick={handleShow}
                            />

                        </div>
                    )}
                    <Modal show={showModal} onHide={handleClose} fullscreen="md-down" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Denah Sekolah</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center bg-light">
                            <img
                                src={`data:image/jpeg;base64,${profile.gambar_denah}`}
                                alt="Denah Sekolah Full"
                                className="img-fluid"
                                style={{ width: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: "8px" }}
                            />
                        </Modal.Body>
                    </Modal>
                </>
            )}

        </Container>
    );
};

export default ProfileSma;
