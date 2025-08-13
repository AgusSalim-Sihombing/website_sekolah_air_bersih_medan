import { useNavigate } from "react-router-dom";
import "./style/DataKelas.css";


const DataSiswaSMA = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const kelasList = ["X_1", "X_2", "XI_IPA", "XII_IPA", "XII_IPS"];

    // const handleClick = () => {
    //     navigate("/admin-sma/manajemen-data-sma/data-siswa-sma/X_IPA"); // Arahkan ke halaman data kelas X_IPA
    // };

    return (
        <div className="p-2" >
            <h2 className="text-xl font-bold mb-4">Pilih Kelas</h2>
            <div className="grid grid-cols-3 gap-4" style={{display:"flex"}}>
                {kelasList.map((kelas) => (
                    <div
                        key={kelas}
                        className="shadow-sm pilihan-costum"
                        style={{
                            width:"100px",
                            height:"100px",
                            justifyContent:"center",
                            alignItems:"center",
                            display:"flex",
                            flexDirection:"column",
                            borderRadius:"5px",
                            cursor:"pointer"
                        }}
                        onClick={() => navigate(`/admin-sma/manajemen-data-sma/data-siswa-sma/${kelas}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })}
                    >
                        <p className="text-lg font-semibold">{kelas}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataSiswaSMA;
