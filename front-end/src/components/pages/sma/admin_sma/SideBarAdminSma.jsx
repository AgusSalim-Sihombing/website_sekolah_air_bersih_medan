import "../../../../styles/admin/SideBar.css"
import { useNavigate } from "react-router-dom"
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";




const SidebarAdminSma = ({ setPageTitle = () => { } }) => {
  const location = useLocation();
  // const isManajemenKontenActive = location.pathname.startsWith("/admin-sma/manajemen-konten-sma");
  // const isManajemenDataActive = location.pathname.startsWith("/admin-sma/manajemen-data-sma");
  const isManajemenKontenActive = location.pathname.includes("/admin-sma/manajemen-konten-sma");
  const isManajemenDataActive = location.pathname.includes("/admin-sma/manajemen-data-sma");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sma")
  }

  return (
    <div >
      <CDBSidebar
        className="sidebar"
        style={{
          position: "fixed",
          overflow: "hidden",
        }}>
        <CDBSidebarHeader>
          <NavLink to="/admin-sma/dashboard-sma" className="text-decoration-none" style={{ color: 'inherit' }}>
            ADMIN PAGES
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            {/* <NavLink
              to="/admin-sma/dashboard-sma"
              className="nav-link"
              onClick={() => setPageTitle("Dashboard")}
            >
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink> */}

            <NavLink
              to="/admin-sma/dashboard-sma"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setPageTitle("Dashboard")}
            >
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink
              to="/admin-sma/user-admin-sma"
              className="nav-link"
              onClick={() => setPageTitle("User Admin")}
            >
              <CDBSidebarMenuItem icon="users">User Admin</CDBSidebarMenuItem>
            </NavLink> */}

            <NavLink
              to="/admin-sma/user-admin-sma"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setPageTitle("User Admin")}
            >
              <CDBSidebarMenuItem icon="users">User Admin</CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink
              to="/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
              className={`nav-link ${isManajemenKontenActive ? "active" : ""}`}
              onClick={() => setPageTitle("Manajemen Konten")}
            >
              <CDBSidebarMenuItem icon="film">Manajemen Konten</CDBSidebarMenuItem>
            </NavLink> */}

            <NavLink
              to="/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
              className={({ isActive }) => `nav-link ${location.pathname === "/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
                || location.pathname === "/admin-sma/manajemen-konten-sma/event-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/pengumuman-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/dokumentasi-kegiatan-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/fasilitas"
                ? "active" : ""
                }`}

              onClick={() => setPageTitle("Manajemen Konten")}
            >
              <CDBSidebarMenuItem icon="film">Manajemen Konten</CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink
              to="/admin-sma/manajemen-data-sma/grafik-siswa-sma"
              className={`nav-link ${isManajemenDataActive ? "active" : ""}`} onClick={() => setPageTitle("Manajemen Data")}>
              <CDBSidebarMenuItem icon="database">Manajemen Data</CDBSidebarMenuItem>
            </NavLink> */}

            <NavLink
              to="/admin-sma/manajemen-data-sma/grafik-siswa-sma"
              className={({ isActive }) => `nav-link ${location.pathname === "/admin-sma/manajemen-data-sma/grafik-siswa-sma"
                || location.pathname === "/admin-sma/manajemen-data-sma/data-siswa-sma"
                || location.pathname === "/admin-sma/manajemen-data-sma/data-guru"
                ? "active" : ""}`}
              onClick={() => setPageTitle("Manajemen Data")}
            >
              <CDBSidebarMenuItem icon="database">Manajemen Data</CDBSidebarMenuItem>
            </NavLink>




          </CDBSidebarMenu>

          <CDBSidebarHeader>
            <NavLink to="/admin-sma/profile-admin-sma" className="text-decoration-none" style={{ color: 'inherit' }}>
              ACCOUNT
            </NavLink>
          </CDBSidebarHeader>



          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            {/* <NavLink to="/admin-sma/profile-admin-sma" className="nav-link" onClick={() => setPageTitle("Admin Profile")}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink> */}

            <NavLink
              to="/admin-sma/profile-admin-sma"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setPageTitle("Admin Profile")}
            >
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin-sma/hero404" target="_blank" className="nav-link">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem icon="arrow-left" className="logout" onClick={handleLogout}>
              Logout
            </CDBSidebarMenuItem>

          </CDBSidebarMenu>

        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            SEKOLAH ADVENT AIR BERSIH
          </div>
        </CDBSidebarFooter>

      </CDBSidebar>
    </div>
  );
};

export default SidebarAdminSma;