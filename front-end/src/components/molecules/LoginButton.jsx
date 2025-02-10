import React, { useState, useEffect } from "react";
import ActionButton from "../atoms/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import DashboardAdmin from "../../adminDashboard/components/pages/dashboard";


const LoginButton = ({ onClick }) => {
    const [id, setId] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const submitLogin = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:3001/web/auth/login",
    //             {
    //                 id,
    //                 password,
    //             }
    //         );

    //         if (response.status == 200) {
    //             console.log("Succes", response.data);
    //             localStorage.setItem('loggedInStatus', true);
    //             localStorage.setItem('token', response.data.token);
    //             localStorage.setItem('id', response.data.id);

    //             navigate('/home')
    //         }


    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
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
        setLoading(true)
        try {

            const response = await axios.post("http://localhost:3001/api/admin/login", {
                username,
                password,
            });

            if (response.status === 200) {

                console.log("Success", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username)
                navigate("/admin/dashboard");



            } else {
                console.log("Login filed", response.data)


            }
        } catch (error) {
            console.error(error.message)
            alert("Login Gagal !")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <ActionButton textButton="Login" onClick={handleShow} type="button" />
            <Modal show={show} onHide={handleClose}>
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
                            <Form.Label>User Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleLogin} disabled={isLoading} >
                        {isLoading ? (

                            <div> <ReactLoading
                                type="spinningBubbles"
                                color="gold"
                                
                            /></div>
                        ) : ("Submit")}
                    </Button> */}
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? handleLogin : null}
                    >
                        {isLoading ? 'Loading…' : 'Login'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default LoginButton;