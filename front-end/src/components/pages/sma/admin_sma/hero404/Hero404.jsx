import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Hero404.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Hero404 = ({ disableStatistik = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedRef = useRef(false); // Untuk memastikan hanya sekali

    useEffect(() => {
        if (disableStatistik || isLoggedRef.current) return;

        const log404 = async () => {
            try {
                await axios.post(`${API_BASE_URL}/public/404`, {
                    url_yang_dicari: location.pathname
                });
                isLoggedRef.current = true; // Supaya hanya kirim sekali
            } catch (err) {
                console.error("Gagal mencatat statistik 404:", err);
            }
        };

        log404();
    }, [location.pathname, disableStatistik]);

    return (
        <div className="hero404-container">
            <motion.img
                src="/error-404-illustration.png"
                alt="404 Illustration"
                className="hero404-image"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                404 - Halaman Tidak Ditemukan
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Sepertinya kamu nyasar ke halaman yang tidak ada. Silahkan Hubungi Admin Jika Ada Masalah.
            </motion.p> 
            <motion.button
                className="hero404-button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Kembali
            </motion.button>
        </div>
    );
};

export default Hero404;
