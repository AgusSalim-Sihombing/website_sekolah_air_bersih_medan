// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () =>{
//     return (
//         <div className="sidebar">
//             <div className="logo">Logo</div>
//             <nav className="nav-menu">
//                 <ul>
//                     <li>
//                         <Link to="admin/dashboard">Dashboard</Link>
//                     </li>
//                     <li>
//                         <Link to="admin/userAdmin">User Admin</Link>
//                     </li>
//                     <li>
//                         <Link to="admin/manajemenKontent">Manajemen Data</Link>
//                     </li>
//                     <li>
//                         <Link to="admin/manajemenKontent">Manajemen Konten</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Sidebar;

import "../../../styles/admin/SideBar.css"
import { useNavigate } from "react-router-dom"

import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from 'react-router-dom';
import ButtonLogout from './ButtonLogout';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <div >
      {/* textColor="#fff" */}
      {/* backgroundColor="#333" */}
      {/* prefix={<i className="fa fa-bars fa-large"></i>} */}
      <CDBSidebar style={{
        position: "fixed",
        overflow: "hidden",

      }}>
        <CDBSidebarHeader>
          <a href="/admin/dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
            ADMIN PAGES
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            <NavLink to="/admin/dashboard" className="nav-link">
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/user-admin" className="nav-link">
              <CDBSidebarMenuItem icon="user">User Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/manajemen-konten" className="nav-link">
              <CDBSidebarMenuItem icon="film">Manajemen Konten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/manajemen-data" className="nav-link">
              <CDBSidebarMenuItem icon="chart-line">Manajemen Data</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin/hero404" target="_blank" className="nav-link">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>              
            </NavLink>
            <CDBSidebarMenuItem icon="sign" className="logout" >
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

export default Sidebar;