import Header from "../organisms/Header"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BerandaPage from "../pages/BerandaPage";
import InfoPage from "../pages/InfoPage";

const LandingPage = () => {
    return (
        <Router>
            <Header />
            <div>
                <Routes>
                    <Route path="/beranda-sma" element={<BerandaPage />} />
                    <Route path="/infopendaftaran" element={<InfoPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default LandingPage;