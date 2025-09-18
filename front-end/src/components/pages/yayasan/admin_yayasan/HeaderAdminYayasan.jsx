
import "../../../../styles/admin/HeaderAdmin.css"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const HeaderAdminYayasan = ({ title }) => {
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [showDropdown, setShowDropdown] = useState(false); // State untuk menampilkan card
    const dropdownRef = useRef(null); // Untuk deteksi klik di luar


    useEffect(() => {
        const storedId = localStorage.getItem("id");
        const storedUser = localStorage.getItem("username");
        if (storedId && storedUser) {
            setId(storedId);
            setUser(storedUser);
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    // const getUserAdmin = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/admin/user-admin`);
    //         if (response.data.length > 0) {
    //             const data = response.data[0];   
    //             setUser(data.username)
    //             setId(data.id)
    //         } else {
    //             setUser("")
    //         }
    //     } catch (error) {
    //         console.error("Gagal mengambil data", error)
    //         setUser("")
    //     }
    // };


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
                            <li><Icon.GearFill /> Setting Profile</li>
                            <li>
                                <div onClick={handleLogout} style={{ cursor: "pointer" , gap: "8px", display: "flex", alignItems: "center"}}>
                                    <Icon.BoxArrowRight />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>

    )
}

export default HeaderAdminYayasan;