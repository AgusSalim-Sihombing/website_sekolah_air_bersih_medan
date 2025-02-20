import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import AuthRoute from "./routes/RootRoutes.jsx"
// import AdminRouth from "./routes/AdminRoute.jsx"
import UserRoutes from "./routes/UserRoute"
import AdminRoutes from "./routes/AdminRoute"
import {AuthProvider} from "./auth/Auth" 
import UserLayout from './layout/user_layout/UserLayout';
import Home from "./components/pages/user/UserHome";
import InformasiPendaftaran from './components/pages/user/InformasiPendaftaran';
import PublicSmaLayout from './layout/sma/public_sma_layout/PublicSmaLayout';
import DashboardSma from './components/pages/sma/dashboard_sma/DashboardSma';
import ProfileSma from './components/pages/sma/profile_sma/ProfileSma';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <UserRoutes />
//       <AdminRoutes/>  
//     </BrowserRouter>
//   )
// }

// export default App

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='informasi-pendaftaran' element={<InformasiPendaftaran/>}/>
            
          </Route>
          <Route path='/sma/' element={<PublicSmaLayout/>}>
            <Route index element={<DashboardSma/>}/>
            <Route path='profile' element={<ProfileSma/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
