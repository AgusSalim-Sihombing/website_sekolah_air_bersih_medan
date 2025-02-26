import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from 'react-bootstrap-icons';
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AdminTable from "./AdminTable";

const UserAdmin = () => {
    
    return (
        <div >
            <div className="user-admin">
              <AdminTable/>
            </div>
        </div>
    )
}

export default UserAdmin;