import React, { useEffect, useState } from "react";
import axios from "axios";
import ""
const UserAdmin = () => {
    const [id, setId] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        getUserAdmin();
    })

    const getUserAdmin = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/user-admin");
            if (response.data.length > 0) {
                const data = response.data[0];
                setUser(data.username)
                setId(data.id)
            } else {
                setUser("")
            }
        } catch (error) {
            console.error("Gagal mengambil data", error)
            setUser("")
        }
    }
    return (
        <div >
            <div className="user-admin">
                <p>{id ? id : "Memuat User id ..."}</p>
                <p>{user ? user : "Memuat User Admin ..."}</p>
            </div>
        </div>
    )
}

export default UserAdmin;