import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import PerkembanganSiswa from "./charts/PerkembanganSiswa";

const Dashboard = () => {
    return(
        <div>
            <h1>DASHBOARD ADMIN</h1>
            <PerkembanganSiswa/>
            <AdminVisiMisiTujuan/>
        </div>
    )
}

export default Dashboard;