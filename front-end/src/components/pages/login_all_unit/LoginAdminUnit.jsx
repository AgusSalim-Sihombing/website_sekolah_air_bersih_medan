import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Toast } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import ReCAPTCHA from "react-google-recaptcha";
import "./LoginAdminUnit.css"

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY;
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const LoginAdminUnit = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [unitSekolah, setUnitSekolah] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const captchaRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const unit = searchParams.get("unit");
        if (unit) setUnitSekolah(unit);
        else navigate("/login");
    }, []);

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setErrorMessage("");
    //     setLoading(true);

    //     const recaptchaToken = captchaRef.current.getValue();
    //     if (!username || !password || !recaptchaToken) {
    //         setErrorMessage("Semua field wajib diisi.");
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(`${API_BASE_URL}/admin-unit/login`, {
    //             username,
    //             password,
    //             unit_sekolah: unitSekolah
    //         });

    //         if (response.status === 200 && response.data.status === "active") {
    //             localStorage.setItem("token", response.data.token);
    //             localStorage.setItem("id", response.data.id);
    //             localStorage.setItem("username", response.data.username);
    //             localStorage.setItem("role", response.data.role);
    //             localStorage.setItem("unit_sekolah", response.data.unit_sekolah);

    //             setToastMessage("Login berhasil, mengarahkan...");
    //             setToastVariant("success");
    //             setShowToast(true);

    //             setTimeout(() => {
    //                 navigate(`/admin-${unitSekolah}/dashboard-${unitSekolah}`);
    //             }, 1500);
    //         }
    //     } catch (error) {
    //         setToastMessage(error.response?.data?.message || "Login gagal");
    //         setToastVariant("danger");
    //         setShowToast(true);
    //     } finally {
    //         setLoading(false);
    //         captchaRef.current.reset();
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const recaptchaToken = captchaRef.current.getValue();
        if (!username || !password || !recaptchaToken) {
            setErrorMessage("Semua field wajib diisi.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/admin-unit/login`, {
                username,
                password,
                unit_sekolah: unitSekolah,
                recaptchaToken // WAJIB dikirim ke back-end
            });

            if (response.status === 200 && response.data.status === "active") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("unit_sekolah", response.data.unit_sekolah);

                setToastMessage("Login berhasil, mengarahkan ke halaman dashboard admin");
                setToastVariant("success");
                setShowToast(true);

                setTimeout(() => {
                    navigate(`/admin-${unitSekolah}/dashboard-${unitSekolah}`);
                }, 1500);
            }
        } catch (error) {
            setToastMessage(error.response?.data?.message || "Login gagal");
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
                <img src="/Background.jpg" alt="Gambar Sekolah" />
            </div>
            <div className="login-form-wrapper">
                <Container style={{ maxWidth: "400px" }}>
                    <h2 className="text-center mb-4">Login Admin {unitSekolah?.toUpperCase()}</h2>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <div className="d-flex justify-content-center mb-3">
                            <ReCAPTCHA ref={captchaRef} sitekey={RECAPTCHA_SITE_KEY} />
                        </div>
                        <div className="d-grid">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <PulseLoader size={6} color="#fff" /> : "Login"}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg={toastVariant}
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    minWidth: "250px",
                    zIndex: 9999,
                }}>
                <Toast.Header><strong className="me-auto">Informasi</strong></Toast.Header>
                <Toast.Body className="text-white">{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
};

export default LoginAdminUnit;
