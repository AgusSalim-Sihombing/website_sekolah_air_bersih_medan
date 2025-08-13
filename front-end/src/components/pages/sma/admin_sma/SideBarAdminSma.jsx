import "../../../../styles/admin/SideBar.css"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Toast } from "react-bootstrap";

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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("unit_sekolah")
    setToastMessage("Logout berhasil! Mengarahkan ke halaman login admin...");
    setToastVariant("success");
    setShowToast(true);

    setTimeout(() => {
      navigate("/login-admin");
    }, 1500);
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
              to="/admin-sma/manajemen-konten-sma/carousel-sma"
              className={({ isActive }) => `nav-link ${location.pathname === "/admin-sma/manajemen-konten-sma/visi-misi-tujuan"
                || location.pathname === "/admin-sma/manajemen-konten-sma/event-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/pengumuman-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/dokumentasi-kegiatan-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/fasilitas"
                || location.pathname === "/admin-sma/manajemen-konten-sma/profil-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/kata-sambutan-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/carousel-sma"
                || location.pathname === "/admin-sma/manajemen-konten-sma/informasi-pendaftaran"
                || location.pathname === "/admin-sma/manajemen-konten-sma/event"
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

            <CDBSidebarMenuItem icon="exclamation-circle" onClick={() => window.open("/halaman-tes-404", "_blank")}>
              Lihat Tampilan 404
            </CDBSidebarMenuItem>


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

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2500}
        autohide
        bg={toastVariant}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: "250px",
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Informasi</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default SidebarAdminSma;