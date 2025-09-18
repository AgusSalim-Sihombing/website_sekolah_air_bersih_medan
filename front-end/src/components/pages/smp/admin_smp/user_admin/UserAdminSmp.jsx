import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as Icon from 'react-bootstrap-icons';
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TableAdminSmp from "./TableAdminSmp";


const UserAdminSmp= () => {
    
    return (
        <div >
            <div className="user-admin">
              <TableAdminSmp/>
            </div>
        </div>
    )
}

export default UserAdminSmp;