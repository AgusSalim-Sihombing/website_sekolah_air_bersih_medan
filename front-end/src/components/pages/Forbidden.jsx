import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center"
        }}>
            <h1>403 - Akses Ditolak</h1>
            <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            <Button variant="primary" onClick={() => navigate("/")}>Kembali ke Beranda</Button>
        </div>
    );
};

export default Forbidden;
