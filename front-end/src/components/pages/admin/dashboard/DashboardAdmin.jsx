import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import PerkembanganSiswa from "./charts/PerkembanganSiswa";

const Dashboard = () => {
    return(
        <div>
            <h1>This is Dashbooard admin</h1>
            <PerkembanganSiswa/>
            <AdminVisiMisiTujuan/>
        </div>
    )
}

export default Dashboard;