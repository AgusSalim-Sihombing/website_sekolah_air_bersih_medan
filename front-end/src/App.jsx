import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import AuthRoute from "./routes/RootRoutes.jsx"
// import AdminRouth from "./routes/AdminRoute.jsx"

import { AuthProvider } from "./auth/Auth"
import UserLayout from './layout/yayasan/public_layout/UserLayout';
import UserHome from './components/pages/yayasan/public_yayasan/UserHome';
import InformasiPendaftaran from './components/pages/yayasan/public_yayasan/InformasiPendaftaran';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './layout/yayasan/admin_layout/AdminLayout';
import Dashboard from './components/pages/yayasan/admin_yayasan/dashboard/DashboardAdmin';
import UserAdmin from './components/pages/yayasan/admin_yayasan/user_admin/UserAdmin';
import ManajemenKonten from './components/pages/yayasan/admin_yayasan/manajemen_konten/ManajemenKonten';
import AdminProfile from './components/pages/yayasan/admin_yayasan/profile/AdminProfile';
import PublicSmaLayout from './layout/sma/public_sma_layout/PublicSmaLayout';
import DashboardSma from './components/pages/sma/dashboard_sma/DashboardSma';
import ProfileSma from './components/pages/sma/profile_sma/ProfileSma';
import DetailKataSambutan from './components/pages/sma/dashboard_sma/kata_sambutan/DetailKataSambutan';
import Fasilitas from './components/pages/Fasilitas';
import ManajemenDataSekolah from './components/pages/yayasan/admin_yayasan/manajemen_data_sekolah/ManajemenDataSekolah';
import AdminSmaLayout from './layout/sma/admin_sma_layout/AdminSmaLayout';
import DashboardAdminSma from './components/pages/sma/admin_sma/dashboard_admin_sma/DashboardAdminSma';
import UserAdminSma from './components/pages/sma/admin_sma/user_admin/UserAdminSma';
import ManajemenKontenSma from './components/pages/sma/admin_sma/manajemen_konten/ManajemenKontenSma';
import AdminProfileSma from './components/pages/sma/admin_sma/profile/AdminProfileSma';
import DataSiswaSma from './components/pages/sma/data_siswa/DataSiswaSma';
import EventSma from './components/pages/sma/event_sma/EventSma';
import EventDetailSma from './components/pages/sma/event_sma/EventDetailSma';
import ManajemenDataSekolahSma from './components/pages/sma/admin_sma/manajemen_data_sekolah_sma/ManajemenDataSekolahSma';
import PengumumanSma from './components/pages/sma/pengumuman_sma/PengumumanSma';
import DetailPengumumanSma from './components/pages/sma/pengumuman_sma/PengumumanDetailSma';
import DetailDataKelasSma from './components/pages/sma/data_siswa/data_kelas_sma/detail_kelas/DetailKelas';
import DokumentasiKegiatan from './components/pages/sma/kegiatan_sma/DokumentasiKegiatan';
import DataGuruTendik from './components/pages/sma/data_guru_tendik/DataGuruTendik';
import DetailGuruTendik from './components/pages/sma/data_guru_tendik/detail_guru_tendik/DetailGuruTendik';



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path='informasi-pendaftaran' element={<InformasiPendaftaran />} />
          </Route>

          {/* <Route path='/admin/' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="user-admin" element={<UserAdmin />} />
            <Route path="manajemen-konten" element={<ManajemenKonten />} />
            <Route path="manajemen-data" element={< ManajemenDataSekolah />} />

          </Route> */}

          <Route path="/admin-yayasan" element={<ProtectedRoute />}>
            {/* <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-admin" element={<UserAdmin />} /> */}
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-admin" element={<UserAdmin />} />
              <Route path="manajemen-konten" element={<ManajemenKonten />} />
              <Route path="manajemen-data" element={< ManajemenDataSekolah />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route path='/admin-sma' element={<ProtectedRoute />}>

            <Route element={<AdminSmaLayout />}>
              <Route path='dashboard-sma' element={<DashboardAdminSma />} />
              <Route path='user-admin-sma' element={<UserAdminSma />} />
              <Route path='manajemen-konten-sma/*' element={<ManajemenKontenSma />} />
              <Route path='manajemen-data-sma/*' element={<ManajemenDataSekolahSma />} />
              <Route path='profile-admin-sma' element={<AdminProfileSma />} />
            </Route>
          </Route>





          <Route path='/sma/' element={<PublicSmaLayout />}>
            <Route index element={<DashboardSma />} />
            <Route path='profile' element={<ProfileSma />} />
            <Route path='kata-sambutan' element={<DetailKataSambutan />} />
            <Route path='fasilitas' element={<Fasilitas />} />
            <Route path='acara'>
              <Route path='events'>
                <Route index element={<EventSma />} />
                <Route path="detail-events/:id" element={<EventDetailSma />} />
              </Route>


              <Route path='pengumuman'>
                <Route index element={<PengumumanSma />} />
                <Route path='detail-pengumuman/:id' element={<DetailPengumumanSma />} />
              </Route>

              <Route path='dokumentasi-kegiatan' element={<DokumentasiKegiatan />} />

            </Route>
            <Route path='database'>
              <Route path='data-siswa-sma' element={<DataSiswaSma />} />
              <Route path='data-siswa-sma/:kelas' element={<DetailDataKelasSma />} />
              <Route path='data-guru-tendik' element={<DataGuruTendik />} />
              <Route path='data-guru-tendik/:id' element={<DetailGuruTendik />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
