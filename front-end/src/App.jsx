import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import AuthRoute from "./routes/RootRoutes.jsx"
// import AdminRouth from "./routes/AdminRoute.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./auth/Auth"
import UserLayout from './layout/yayasan/public_layout/UserLayout';
import UserHome from './components/pages/yayasan/public_yayasan/UserHome';
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
import ArsipDetail from './components/pages/ArsipDetail';
import HalamanStrukturOrganisasi from './components/pages/sma/dashboard_sma/StrukturisasiSma/MobileStrukturisasiSma';
import InformasiPendaftaran from './components/pages/informasi_pendaftaran/InformasiPendaftaran';
import LoginSelector from './components/pages/login_selector/LoginSelector';
import Events from './components/pages/events/Events';
import DetailEvent from './components/pages/events/EventsDetail';
import PublicSmpLayout from './layout/smp/public_smp_layout/PublicSmpLayout';
import LoginAdminUnit from './components/pages/login_all_unit/LoginAdminUnit';
import Hero404 from './components/pages/sma/admin_sma/hero404/Hero404';
import DashboardSmp from './components/pages/smp/dashboard_smp/DashboardSmp';
import DetailKataSambutanSmp from './components/pages/smp/dashboard_smp/kata_sambutan/DetailKataSambutanSmp';
import PublicSmkLayout from './layout/smk/public_layout/PublicSmkLayout';
import DashboardSmk from './components/pages/smk/dashboard_smk/DashboardSmk';
import DetailKataSambutanSmk from './components/pages/smk/dashboard_smk/kata_sambutan/DetailKataSambutanSmk';
import DashboardAdminSmp from './components/pages/smp/admin_smp/dashboard_admin_smp/DashboardAdminSmp';
import AdminSmpLayout from './layout/smp/admin_smp_layout/AdminSmpLayout';
import AdminSmkLayout from './layout/smk/admin_smk_layout/AdminSmkLayout';
import DashboardAdminSmk from './components/pages/smk/admin_smk/dashboard_admin_smk/DashboardAdminSmk';
import UserAdminSmp from './components/pages/smp/admin_smp/user_admin/UserAdminSmp';
import ManajemenKontenSmp from './components/pages/smp/admin_smp/manajemen_konten/ManajemenKontenSmp';



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/login-admin" element={<LoginSelector />} />
          <Route path="/login-admin-unit" element={<LoginAdminUnit />} />

          <Route path='/' element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path="/arsip/:id" element={<ArsipDetail />} />
          </Route>



          <Route path="/admin-yayasan" element={<ProtectedRoute />}>
            {/* <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-admin" element={<UserAdmin />} /> */}
            <Route element={<AdminLayout />}>
              <Route path="dashboard-yayasan" element={<Dashboard />} />
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


          <Route path='/smp/' element={<PublicSmpLayout />}>
            <Route index element={<DashboardSmp />} />
            <Route path='kata-sambutan' element={<DetailKataSambutanSmp />} />
          </Route>

          <Route path='/admin-smp' element={<ProtectedRoute />}>
            <Route element={<AdminSmpLayout />}>
              <Route path='dashboard-smp' element={<DashboardAdminSmp />} />
               <Route path='user-admin-smp' element={<UserAdminSmp />} />
               <Route path='manajemen-konten-smp/*' element={<ManajemenKontenSmp />} />
            </Route>
          </Route>

          <Route path='/smk/' element={<PublicSmkLayout />}>
            <Route index element={<DashboardSmk />} />
            <Route path='kata-sambutan' element={<DetailKataSambutanSmk />} />
          </Route>

          <Route path='/admin-smk' element={<ProtectedRoute />}>
            <Route element={<AdminSmkLayout />}>
              <Route path='dashboard-smk' element={<DashboardAdminSmk />} />
            </Route>
          </Route>



          <Route path='/sma/' element={<PublicSmaLayout />}>
            <Route index element={<DashboardSma />} />
            <Route path='profile' element={<ProfileSma />} />
            <Route path='kata-sambutan' element={<DetailKataSambutan />} />
            <Route path='fasilitas' element={<Fasilitas />} />
            <Route path='detail-strukturisasi' element={<HalamanStrukturOrganisasi />} />
            <Route path='acara'>
              <Route path='events'>
                {/* <Route index element={<EventSma />} /> */}
                {/* <Route path="detail-events/:id" element={<EventDetailSma />} /> */}
                <Route index element={<Events />} />
                <Route path="detail-events/:id" element={<DetailEvent />} />
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

            <Route path='informasi-pendaftaran' element={<InformasiPendaftaran />} />
          </Route>

          <Route path="/halaman-tes-404" element={<Hero404 disableStatistik />} />


          <Route path="/forbidden" element={<Hero404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
