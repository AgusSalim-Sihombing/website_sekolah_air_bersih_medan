// import React, { useState, useEffect } from "react";
// import ActionButton from "../../atoms/ActionButton";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import PulseLoader from "react-spinners/PulseLoader";


// const LoginButtonSma = ({ onClick }) => {
//     const [id, setId] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState({ username: "", password: "" });
//     const navigate = useNavigate();
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     let [color, setColor] = useState("#ffffff");

//     useEffect(() => {
//         function simulateNetworkRequest() {
//             return new Promise(resolve => {
//                 setTimeout(resolve, 5000);
//             });
//         }

//         if (isLoading) {
//             simulateNetworkRequest().then(() => {
//                 setLoading(false);
//             });
//         }
//     }, [isLoading]);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMessage({ username: "", password: "" });

//         if (!username) {
//             setErrorMessage(prev => ({ ...prev, username: "Username tidak boleh kosong" }));
//         }
//         if (!password) {
//             setErrorMessage(prev => ({ ...prev, password: "Password tidak boleh kosong" }));
//         }
//         if (!username || !password) {
//             setLoading(false);
//             return;
//         }

//         const recaptchaToken = window.grecaptcha.getResponse();

//         if (!recaptchaToken) {
//             setErrorMessage({ password: "Silakan centang captcha terlebih dahulu" });
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:3001/api/admin-sma/login-admin-sma", {
//                 username,
//                 password,
//                 recaptchaToken
//             });


//             if (response.status === 200 || response.data.status === "active") {
//                 console.log("Success", response.data);
//                 localStorage.setItem("token", response.data.token);
//                 localStorage.setItem("id", response.data.id);
//                 localStorage.setItem("username", response.data.username);
//                 localStorage.setItem("role", response.data.role)
//                 navigate("/admin-sma/dashboard-sma");
//             } else {
//                 console.log("Login failed", response.data);
//             }
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.status === 403) {
//                     setErrorMessage({ username: "", password: "Akun tidak aktif. Hubungi administrator." });
//                 } else {
//                     setErrorMessage({ username: "", password: "Username atau password salah" });
//                 }
//             } else {
//                 setErrorMessage({ username: "", password: "Terjadi kesalahan. Coba lagi nanti." });
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <ActionButton textButton="Login" onClick={handleShow} type="button" />
//             <Modal show={show} onHide={handleClose} style={{ zIndex: "9999" }}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>User Admin Login</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div
//                         className="g-recaptcha"
//                         data-sitekey="6LerRGIrAAAAAC8UgJcjD6aUhjIDuarJwUAIN7Nk"
//                         style={{ marginTop: '10px' }}
//                     >
//                     </div>
//                     <Form>
//                         <Form.Group className="mb-3" >
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="username"
//                                 autoFocus
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             {errorMessage.username && <p style={{ color: "red" }}>{errorMessage.username}</p>}

//                             <Form.Label>User Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             {errorMessage.password && <p style={{ color: "red" }}>{errorMessage.password}</p>}
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button
//                         variant="primary"
//                         disabled={isLoading}
//                         onClick={!isLoading ? handleLogin : null}
//                     >
//                         {isLoading ? <div className="sweet-loading" >

//                             <PulseLoader
//                                 color={color}
//                                 loading={isLoading}
//                                 size={5}
//                                 aria-label="Loading Spinner"
//                                 data-testid="loader"

//                             />
//                         </div> : 'Login'}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default LoginButtonSma;

import React, { useState, useEffect, useRef } from "react";
import ActionButton from "../../atoms/ActionButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PulseLoader from "react-spinners/PulseLoader";
import ReCAPTCHA from "react-google-recaptcha";

const LoginButtonSma = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const captchaRef = useRef(null); // <- reCAPTCHA ref

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage({ username: "", password: "" });

        if (!username) {
            setErrorMessage(prev => ({ ...prev, username: "Username tidak boleh kosong" }));
        }
        if (!password) {
            setErrorMessage(prev => ({ ...prev, password: "Password tidak boleh kosong" }));
        }
        if (!username || !password) {
            setLoading(false);
            return;
        }

        const recaptchaToken = captchaRef.current.getValue(); // Ambil token captcha
        if (!recaptchaToken) {
            setErrorMessage({ password: "Silakan centang captcha terlebih dahulu" });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/admin-sma/login-admin-sma", {
                username,
                password,
                recaptchaToken
            });

            if (response.status === 200 || response.data.status === "active") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("role", response.data.role);
                navigate("/admin-sma/dashboard-sma");
            } else {
                console.log("Login failed", response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setErrorMessage({ username: "", password: "Akun tidak aktif. Hubungi administrator." });
                } else {
                    setErrorMessage({ username: "", password: "Username atau password salah" });
                }
            } else {
                setErrorMessage({ username: "", password: "Terjadi kesalahan. Coba lagi nanti." });
            }
        } finally {
            setLoading(false);
            captchaRef.current.reset(); // Reset CAPTCHA setelah submit
        }
    };

    return (
        <div>
            <ActionButton textButton="Login" onClick={handleShow} type="button" />
            <Modal show={show} onHide={handleClose} style={{ zIndex: "9999" }}>
                <Modal.Header closeButton>
                    <Modal.Title>User Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errorMessage.username && <p style={{ color: "red" }}>{errorMessage.username}</p>}

                            <Form.Label>User Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errorMessage.password && <p style={{ color: "red" }}>{errorMessage.password}</p>}
                        </Form.Group>

                        <div className="d-flex justify-content-center my-3">
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey="6LerRGIrAAAAAC8UgJcjD6aUhjIDuarJwUAIN7Nk"
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                className="me-2"
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <PulseLoader color="#ffffff" size={5} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginButtonSma;
