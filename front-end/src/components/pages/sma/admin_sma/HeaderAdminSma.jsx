
import "../../../../styles/admin/HeaderAdmin.css"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

const HeaderAdminSma = ({ title }) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [showDropdown, setShowDropdown] = useState(false); // State untuk menampilkan card
    const dropdownRef = useRef(null); // Untuk deteksi klik di luar


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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
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
                    {user ? user : ".."}
                </div>

                {/* Dropdown Card */}
                {showDropdown && (
                    <div className="profile-dropdown">
                        <ul>
                            <li>
                                <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
                                    <><Icon.Gear /></>
                                    <a href="/admin-sma/profile-admin-sma" style={{ color: 'inherit',textDecoration:"none" }}> Profile Setting</a>

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
            </div>
        </header>

    )
}

export default HeaderAdminSma;