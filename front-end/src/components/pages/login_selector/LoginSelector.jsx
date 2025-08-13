import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import "./LoginSelector.css";

const LoginSelector = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = (unit) => {
        navigate(`/login-admin-unit?unit=${unit}`);

    };

    return (
        <div className="login-selector-page">
            <div className="overlay">
                <Container className="text-center selector-container">
                    <h1 className="mb-5 text-white fw-bold">Login Sebagai?</h1>
                    <div className="items-selector">
                        <Card className="login-card" onClick={() => handleLoginRedirect("YAYASAN")}>
                            <Card.Body className="text-center"><h5>Admin Yayasan</h5></Card.Body>
                        </Card>
                        <Card className="login-card" onClick={() => handleLoginRedirect("SMP")}>
                            <Card.Body className="text-center"><h5>Admin SMP</h5></Card.Body>
                        </Card>
                        <Card className="login-card mt-4" onClick={() => handleLoginRedirect("SMA")}>
                            <Card.Body className="text-center"><h5>Admin SMA</h5></Card.Body>
                        </Card>
                        <Card className="login-card" onClick={() => handleLoginRedirect("SMK")}>
                            <Card.Body className="text-center"><h5>Admin SMK</h5></Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LoginSelector;
