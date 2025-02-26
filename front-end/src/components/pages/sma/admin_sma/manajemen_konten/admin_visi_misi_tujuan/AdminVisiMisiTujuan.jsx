import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css"
import AdminMisi from "./AdminMisi";
import AdminVisi from "./AdminVisi";
import AdminTujuan from "./AdminTujuan";

const AdminVisiMisiTujuan = () => {

    return (
        <div>
            <h5 className="text-center mb-4">Visi, Misi dan Tujuan</h5>
            <AdminVisi />
            <AdminMisi />
            <AdminTujuan />

        </div>
    );
}

export default AdminVisiMisiTujuan;