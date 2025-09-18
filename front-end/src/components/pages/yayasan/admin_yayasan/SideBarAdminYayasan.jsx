

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


const SidebarAdminYayasan = ({ setPageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");


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
      {/* textColor="#fff" */}
      {/* backgroundColor="#333" */}
      {/* prefix={<i className="fa fa-bars fa-large"></i>} */}
      <CDBSidebar
        className="sidebar"
        style={{
          position: "fixed",
          overflow: "hidden",
        }}>
        <CDBSidebarHeader>
          <a href="/admin-yayasan/dashboard-yayasan" className="text-decoration-none" style={{ color: 'inherit' }}>
            ADMIN PAGES
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="cdb-sidebar-menu-item">

            <NavLink
              to="/admin-yayasan/dashboard-yayasan"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setPageTitle("Dashboard")}
            >
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin-yayasan/user-admin" className="nav-link" onClick={() => setPageTitle("User Admin")}>
              <CDBSidebarMenuItem icon="users">User Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin-yayasan/manajemen-konten" className="nav-link" onClick={() => setPageTitle("Manajemen Konten")}>
              <CDBSidebarMenuItem icon="film">Manajemen Konten</CDBSidebarMenuItem>
            </NavLink>


          </CDBSidebarMenu>

          <CDBSidebarHeader>
            <a href="/admin-yayasan/dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
              ACCOUNT
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            <NavLink to="/admin-yayasan/profile" className="nav-link" onClick={() => setPageTitle("Admin Profile")}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin-yayasan/hero404" target="_blank" className="nav-link">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem icon="arrow-left" className="logout" >
              <div onClick={handleLogout}>Logout</div>
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

export default SidebarAdminYayasan;