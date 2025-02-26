import "../../../../styles/admin/SideBar.css"
import { useNavigate } from "react-router-dom"
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";


const SidebarAdminSma = ({ setPageTitle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sma")
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
          <a href="/admin-sma/dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
            ADMIN PAGES
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            <NavLink to="/admin-sma/dashboard-sma" className="nav-link" onClick={() => setPageTitle("Dashboard")}>
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin-sma/user-admin-sma" className="nav-link" onClick={() => setPageTitle("User Admin")}>
              <CDBSidebarMenuItem icon="users">User Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin-sma/manajemen-konten-sma" className="nav-link" onClick={() => setPageTitle("Manajemen Konten")}>
              <CDBSidebarMenuItem icon="film">Manajemen Konten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin-sma/manajemen-data-sma" className="nav-link" onClick={() => setPageTitle("Manajemen Data")}>
              <CDBSidebarMenuItem icon="database">Manajemen Data</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>

          <CDBSidebarHeader>
            <a href="/admin-sma/profile-admin-sma" className="text-decoration-none" style={{ color: 'inherit' }}>
              ACCOUNT
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            <NavLink to="/admin-sma/profile-admin-sma" className="nav-link" onClick={() => setPageTitle("Admin Profile")}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin-sma/hero404" target="_blank" className="nav-link">
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

export default SidebarAdminSma;