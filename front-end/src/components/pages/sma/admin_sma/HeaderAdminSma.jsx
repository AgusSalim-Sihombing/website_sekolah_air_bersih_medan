
import "../../../../styles/admin/HeaderAdmin.css"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import {Toast } from "react-bootstrap";

const HeaderAdminSma = ({ title }) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("")
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

    const [showDropdown, setShowDropdown] = useState(false); // State untuk menampilkan card
    const dropdownRef = useRef(null); // Untuk deteksi klik di luar
    const token = localStorage.getItem("token")

    // useEffect(() => {
    //     if (token) {
    //         getUserAdmin();
    //     }
    // }, [token]);

    useEffect(() => {
        // Ambil data dari localStorage
        const storedId = localStorage.getItem("id");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (storedId && storedUsername) {
            setId(storedId);
            setUsername(storedUsername);
            setRole(storedRole || "-");
        }
    }, []);


    const getUserAdmin = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin-sma/get-admin-sma", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Gagal mengambil data", error)
            setUsername("")
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("unit_sekolah")
        setToastMessage("Logout berhasil! Mengarahkan ke halaman login admin...");
        setToastVariant("success");
        setShowToast(true);

        setTimeout(() => {
            navigate("/login-admin");
        }, 1500);
    }


    // Fungsi untuk menangani klik di luar dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky-header-admin">
            <h5>{title}</h5>
            <div className="circle-profile-group" ref={dropdownRef}>
                <div
                    className="circle-profile-admin"
                    onClick={() => setShowDropdown(!showDropdown)} // Toggle card saat diklik
                >
                    <Icon.Person size={20} />
                </div>

                <div className="name-admin">
                    {username ? username : ".."}
                </div>


                {/* Dropdown Card */}
                {showDropdown && (
                    <div className="profile-dropdown">
                        <ul>
                            <li>
                                <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
                                    <><Icon.Gear /></>
                                    <a href="/admin-sma/profile-admin-sma" style={{ color: 'inherit', textDecoration: "none" }}> Profile Setting</a>

                                </div>
                            </li>
                            <li><div onClick={handleLogout} style={{ gap: "10px", display: "flex", alignItems: "center" }}>
                                <Icon.BoxArrowRight />
                                <>Logout</>
                            </div>
                            </li>
                        </ul>
                    </div>
                )}
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
        </header>

    )
}

export default HeaderAdminSma;