import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Toast } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import ReCAPTCHA from "react-google-recaptcha";
import "./LoginAdminSma.css";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY;
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const LoginAdminSma = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const captchaRef = useRef(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        if (!username || !password) {
            setErrorMessage("Username dan password tidak boleh kosong.");
            setLoading(false);
            return;
        }

        const recaptchaToken = captchaRef.current.getValue();
        if (!recaptchaToken) {
            setErrorMessage("Silakan centang reCAPTCHA terlebih dahulu.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/admin-sma/login-admin-sma`, {
                username,
                password,
                recaptchaToken,
            });

            if (response.status === 200 && response.data.status === "active") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("unit_sekolah", response.data.unit_sekolah);

                setToastMessage("Login berhasil! Mengarahkan ke dashboard...");
                setToastVariant("success");
                setShowToast(true);

                setTimeout(() => {
                    navigate("/admin-sma/dashboard-sma");
                }, 1500);
            } else {
                setToastMessage("Login gagal. Periksa kembali akun Anda.");
                setToastVariant("danger");
                setShowToast(true);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                setToastMessage("Akun tidak aktif. Hubungi administrator.");
            } else {
                setToastMessage("Username atau password salah.");
            }
            setToastVariant("danger");
            setShowToast(true);
        } finally {
            setLoading(false);
            captchaRef.current.reset();
        }

    };

    return (
        <div className="login-page">
            <div className="login-image">
                <img
                    src="/Background.jpg" // ganti sesuai path gambar kamu
                    alt="Gambar Sekolah"
                />
            </div>

            <div className="login-form-wrapper">
                <Container style={{ maxWidth: "400px" }}>
                    <h2 className="text-center mb-4">Login Admin SMA</h2>

                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mb-3">
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={RECAPTCHA_SITE_KEY}
                            />
                        </div>

                        <div className="d-grid">
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                {isLoading ? <PulseLoader size={6} color="#ffffff" /> : "Login"}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2500}
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
                <Toast.Header>
                    <strong className="me-auto">Informasi</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{toastMessage}</Toast.Body>
            </Toast>

        </div>
    );
};

export default LoginAdminSma;
