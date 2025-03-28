import React, { useState, useEffect } from "react";
import ActionButton from "../../atoms/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PulseLoader from "react-spinners/PulseLoader";


const LoginButtonSma = ({ onClick }) => {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [color, setColor] = useState("#ffffff");

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 5000);
            });
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

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

        try {
            const response = await axios.post("http://localhost:3001/api/admin-sma/login-admin-sma", {
                username,
                password,
            });

            if (response.status === 200) {
                console.log("Success", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);
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
        }
    };

    return (
        <div>
            <ActionButton textButton="Login" onClick={handleShow} type="button" />
            <Modal show={show} onHide={handleClose} style={{zIndex:"9999"}}>
                <Modal.Header closeButton>
                    <Modal.Title>User Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? handleLogin : null}
                    >
                        {isLoading ? <div className="sweet-loading" >

                            <PulseLoader
                                color={color}
                                loading={isLoading}
                                size={5}
                                aria-label="Loading Spinner"
                                data-testid="loader"

                            />
                        </div> : 'Login'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginButtonSma;