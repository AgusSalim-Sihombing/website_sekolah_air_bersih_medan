import { useNavigate } from "react-router-dom";
import "./DataKelasSma.css";


const DataKelasSMA = () => {
    const navigate = useNavigate();


    const kelasList = ["X_IPA", "X_IPS", "XI_IPA", "XI_IPS", "XII_IPA", "XII_IPS"];

    // const handleClick = () => {
    //     navigate("/admin-sma/manajemen-data-sma/data-siswa-sma/X_IPA"); // Arahkan ke halaman data kelas X_IPA
    // };

    return (
        <div className="p-5 layout-data-costum" >
            <h2 className="text-xl font-bold mb-4">Pilih Kelas</h2>
            <div className="grid grid-cols-3 gap-4 grid-costum" style={{ display: "flex" }}>
                {kelasList.map((kelas) => (
                    <div
                        key={kelas}
                        className="shadow-sm pilihan-costum"

                        style={{
                            width: "100px",
                            height: "100px",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate(`/sma/database/data-siswa-sma/${kelas}`)}
                    >
                        <p className="text-lg font-semibold">{kelas}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataKelasSMA;
