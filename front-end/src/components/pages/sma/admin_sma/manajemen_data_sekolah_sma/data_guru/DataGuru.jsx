import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as XLSX from "xlsx";

const DataGuru = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDataGuru, setSelectedDataGuru] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        no_hp: "",
        alamat: "",
        mata_pelajaran: "",
        foto: null
    })

    useEffect(() => {
        getDataGuru();
    }, []);

    const getDataGuru = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin-sma/get-data-guru");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShowModal = (guru = null) => {
        setSelectedDataGuru(guru);
        setFormData(guru ? {
            nama: guru.nama,
            email: guru.email,
            no_hp: guru.no_hp,
            alamat: guru.alamat,
            mata_pelajaran: guru.mata_pelajaran,
            foto: null
        } : {
            nama: "",
            email: "",
            no_hp: "",
            alamat: "",
            mata_pelajaran: "",
            foto: null
        })
        setShowEditModal(true);
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, foto: e.target.files[0] });
    };

    const handleAddGuru = async (e) => {
        e.prevetDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/admin-sma/data-guru", formData);
            alert(response.data.message); // Notifikasi sukses
            setShowAddModal(false);
            setFormData({ nama: "", email: "", no_hp: "", alamat: "", mata_pelajaran: "" });
            window.location.reload(); // Refresh halaman untuk update data
        } catch (error) {
            console.error("Error:", error.response?.data?.message || "Terjadi kesalahan");
        }

    }

    const handleUpload = async () => {
        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post("http://localhost:3001/api/admin-sma/upload-excel-guru", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Upload sukses!");
            getDataGuru();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const handleEdit = (guru) => {
        setSelectedDataGuru(guru);
        setFormData({
            nama: guru.nama,
            email: guru.email,
            no_hp: guru.no_hp,
            alamat: guru.alamat,
            mata_pelajaran: guru.mata_pelajaran
        })
        setShowEditModal(true)
    }

    // const handleUpdate = async () => {
    //     const updateData = new FormData();
    //     // for (let key in formData) {
    //     //     updateData.append(key, formData[key])
    //     // }
    //     updateData.append("nama", formData.nama);
    //     updateData.append("email", formData.email);
    //     updateData.append("no_hp", formData.no_hp);
    //     updateData.append("alamat", formData.alamat);
    //     updateData.append("mata_pelajaran", formData.mata_pelajaran);


    //     if (formData.foto) {
    //         updateData.append("foto", formData.foto);
    //     } else {
    //         updateData.append("fotoLama", formData.fotoLama);
    //     }

    //     try {
    //         if (selectedDataGuru) {
    //             await axios.put(`http://localhost:3001/api/admin-sma/data-guru/${selectedDataGuru.id}`, updateData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //             setShowEditModal(false);
    //             alert("Data berhasil di update :)")
    //             getDataGuru()
    //         } else {
    //             await axios.put(`http://localhost:3001/api/admin-sma/data-guru`, updateData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });

    //         }

    //     } catch (error) {
    //         alert("Data Gagal  di update :(")
    //         console.error("Gagal memperbaharui data guru :", error)
    //     }
    // }

    const handleUpdate = async () => {
        const updateData = new FormData();
        updateData.append("nama", formData.nama);
        updateData.append("email", formData.email);
        updateData.append("no_hp", formData.no_hp);
        updateData.append("alamat", formData.alamat);
        updateData.append("mata_pelajaran", formData.mata_pelajaran);

        if (formData.foto) {
            updateData.append("foto", formData.foto);
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/api/admin-sma/data-guru/${selectedDataGuru.id}`,
                updateData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(response.data.message);
            setShowEditModal(false);
            getDataGuru();
        } catch (error) {
            console.error("Update error:", error.response?.data);
            alert(error.response?.data?.error || "Gagal memperbarui data guru");
        }
    };

    // const handleDeleteById = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:3001/api/admin-sma/delete-data-guru/${id}`);
    //         getDataGuru();
    //     } catch (error) {
    //         console.error("Error deleting data:", error);
    //     }
    // };

    const handleDeleteById = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

        try {
            const response = await axios.delete(
                `http://localhost:3001/api/admin-sma/delete-data-guru/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(response.data.message);
            getDataGuru();
        } catch (error) {
            console.error("Delete error:", error.response?.data);
            alert(error.response?.data?.message || "Gagal menghapus data");
        }
    };

    const handleDeleteAllData = async (id) => {
        try {
            await axios.delete("http://localhost:3001/api/admin-sma/delete-all-guru");
            getDataGuru();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleDownloadCSV = () => {
        if (data.length === 0) return;

        const csvHeader = "ID,Nama,Email,No Hp,Alamat,Mata Pelajaran\n";
        const csvRows = data.map(item =>
            `${item.id},"${item.nama}","${item.email}","${item.no_hp}","${item.alamat}","${item.mata_pelajaran}"`
        );

        const csvContent = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `data-guru.csv`;
        link.click();
    };



    const handleDownloadExcel = () => {
        if (data.length === 0) return;

        // Ubah data sebelum dikonversi ke Excel
        const formattedData = data.map(item => ({
            ID: item.id,
            Nama: item.nama,
            Email: item.email,
            No_Hp: item.no_hp,
            Alamat: item.alamat,
            Mapel: item.mata_pelajaran,
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Format kolom Tanggal Lahir sebagai date di Excel
        const wscols = [
            { wch: 5 },  // ID
            { wch: 20 }, // Nama
            { wch: 12 }, // Email
            { wch: 15 }, // No hp
            { wch: 10 }, // alamat
            { wch: 15 }, // Mata pelajaran
        ];
        ws["!cols"] = wscols;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "DataGuru");

        // Simpan file dengan nama berdasarkan kelas
        XLSX.writeFile(wb, `data-guru.xlsx`);
    };

    const filteredData = data.filter(guru =>
        guru.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="p-4">

            <h2 className="text-xl font-bold mb-3">Data Guru</h2>

            <div style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
                <div>
                    <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Tambahkan Data Guru</Button>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <Form.Control
                        type="text"
                        placeholder="Cari Nama Guru..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "250px" }}
                    />
                    Unduh Data Guru:
                    <Icon.FiletypeCsv
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={handleDownloadCSV}
                        title="Download CSV"
                    />

                    <Icon.FiletypeXlsx
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={handleDownloadExcel}
                        title="Download Excel"
                    />

                </div>

            </div>
            <Table>
                <thead>
                    <tr className="bg-grey-800">
                        <th className="border p-2">ID</th>
                        <th className="border p-4">Nama</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">No Hp</th>
                        <th className="border p-2">Alamat</th>
                        <th className="border p-2">Mata Pelajaran</th>
                        <th className="border p-2">Foto</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>


                <tbody>
                    {filteredData.map((guru) => (
                        <tr key={guru.id} className="text-center">
                            <td className="border p-2">{guru.id}</td>
                            <td className="border p-4">{guru.nama}</td>
                            <td className="border p-2">{guru.email}</td>
                            <td className="border p-2">{guru.no_hp}</td>
                            <td className="border p-2">{guru.alamat}</td>
                            <td className="border p-2">{guru.mata_pelajaran}</td>
                            <td >
                                {guru.foto ? (<img src={guru.foto} alt={guru.nama} style={{ width: "100px", height: "100px", objectFit: "cover" }} />) : ("Tidak ada Foto")
                                }
                            </td>
                            <td className="border p-2" >
                                <div style={
                                    { display: "flex" }
                                }>
                                    <Button variant="primary" className="mx-1" onClick={() => handleEdit(guru)}>
                                        <Icon.Pen />
                                    </Button>

                                    <Button variant="danger" onClick={() => handleDeleteById(guru.id)}>
                                        <Icon.Trash />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedDataGuru ? "Edit Data Guru" : "Tambahkan Data Guru"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>No Hp</Form.Label>
                            <Form.Control type="text" value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mata Pelajaran</Form.Label>
                            <Form.Control type="text" value={formData.mata_pelajaran} onChange={(e) => setFormData({ ...formData, mata_pelajaran: e.target.value })} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Foto :</Form.Label>
                            {selectedDataGuru && selectedDataGuru.foto && (
                                <div>
                                    <img
                                        src={selectedDataGuru.foto}
                                        alt="foto guru"
                                        width="200"
                                        height="150"
                                        className="mb-2"
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Gambar</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        {/* <Form.Group>
                                        <Form.Label>Upload Flyer</Form.Label>
                                        <Form.Control type="file" name="flyer" onChange={handleFileChange} />
                                    </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Batal</Button>
                    <Button variant="primary" onClick={handleUpdate}>Simpan Perubahan</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default DataGuru;