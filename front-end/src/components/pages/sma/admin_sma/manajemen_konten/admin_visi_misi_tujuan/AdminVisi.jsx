import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const AdminVisi = () => {
  const [visi, setVisi] = useState("");
  const [message, setMessage] = useState("Belum Ada Perubahan Data");
  const [isLoading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // useEffect(() => {
  //   getVisi();
  // }, []);

  // useEffect(() => {
  //   function simulateNetworkRequest() {
  //     return new Promise((resolve) => {
  //       setTimeout(resolve, 3000);
  //       setMessage("Data Sedang Diperbaharui..");
  //     });
  //   }

  //   if (isLoading) {
  //     simulateNetworkRequest().then(() => {
  //       setLoading(false);
  //       setMessage("Data Berhasil Di Perbaharui ;)");
  //     });
  //   }
  // }, [isLoading]);

  // const addVisi = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`${API_BASE_URL}/admin/add-visi`, { visi });
  //     setShowAddModal(false);
  //     alert("Visi Berhasil Ditambahkan")
  //     getVisi()

  //   } catch (error) {
  //     console.error("Gagal menambahkan visi:", error);
  //   }
  // }

  // const getVisi = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/api/admin/visi");
  //     if (response.data.length > 0) {
  //       const data = response.data[0];
  //       setVisi(data.visi);
  //     }
  //   } catch (error) {
  //     console.error("Gagal mengambil data:", error);
  //   }
  // };

  // const updateVisi = async () => {
  //   setLoading(true);
  //   setMessage("Data Sedang Diperbaharui...");

  //   try {
  //     const response = await axios.put("http://localhost:3001/api/admin/update-visi", { visi });
  //     if (response.status === 200) {
  //       setTimeout(() => {
  //         getVisi();
  //         setLoading(false);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setMessage("Gagal Memperbaharui Data!");
  //     console.error("Error saat memperbarui visi:", error);
  //   } finally {
  //     setTimeout(() => {
  //       setMessage("Belum Ada Perubahan Data");
  //       setLoading(false);
  //     }, 3000);
  //   }
  // };

  // const deleteVisi = async () => {
  //   const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus visi ini?");
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`${API_BASE_URL}/admin/delete-visi`);
  //     setVisi("");
  //     setMessage("Visi berhasil dihapus.");
  //     alert("Visi Berhasil Dihapus")
  //     getVisi()
  //   } catch (error) {
  //     console.error("Gagal menghapus visi:", error);
  //     setMessage("Gagal menghapus visi.");
  //   }
  // };

  // Ambil data saat pertama render
  useEffect(() => {
    getVisi();
  }, []);

  // Fungsi ambil data visi
  const getVisi = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/visi`);
      const data = response.data[0];
      setVisi(data ? data.visi : ""); // Kosongkan jika tidak ada data
    } catch (error) {
      console.error("Gagal mengambil data visi:", error);
    }
  };

  // Tambah data visi
  const addVisi = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/add-visi`, { visi });
      alert("Visi berhasil ditambahkan.");
      setShowAddModal(false);
      getVisi(); // Refresh data
    } catch (error) {
      console.error("Gagal menambahkan visi:", error);
    }
  };

  // Perbarui visi
  const updateVisi = async () => {
    setLoading(true);
    setMessage("Data Sedang Diperbaharui...");

    try {
      const response = await axios.put(`${API_BASE_URL}/admin/update-visi`, { visi });
      if (response.status === 200) {
        await getVisi();
        setMessage("Data Berhasil Diperbaharui ;)");
      }
    } catch (error) {
      console.error("Error saat memperbarui visi:", error);
      setMessage("Gagal Memperbaharui Data!");
    } finally {
      setLoading(false);
    }
  };

  // Hapus visi
  const deleteVisi = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus visi ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/delete-visi`);
      setVisi(""); // Kosongkan editor ReactQuill
      alert("Visi berhasil dihapus.");
      setMessage("Visi berhasil dihapus.");
      getVisi()
    } catch (error) {
      console.error("Gagal menghapus visi:", error);
      setMessage("Gagal menghapus visi.");
    }
  };


  return (
    // <div className="visi">
    //   <div className="card">
    //     <div className="card-header">
    //       <h5 className="card-title text-center">Visi</h5>
    //     </div>
    //     <div className="card-body">
    //       {/* Tampilkan HTML visi dengan aman */}
    //       <div dangerouslySetInnerHTML={{ __html: visi }} />
    //     </div>
    //   </div>

    //   <div className="form-edit">
    //     <ReactQuill value={visi} onChange={setVisi} className="custom-quill" />
    //     <p className="text-center mt-3">{message}</p>
    //     <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    //       <button
    //         className="btn btn-update mt-3"
    //         onClick={updateVisi}
    //         disabled={isLoading}
    //       >
    //         {isLoading ? "Loading.." : "Update Visi"}
    //       </button>

    //       <button
    //         className="btn btn-update mt-3"
    //         onClick={() => setShowAddModal(true)}
    //         disabled={visi !== "" || isLoading}
    //       >
    //         {isLoading ? "Loading.." : "Tambahkan Visi"}
    //       </button>

    //       <button
    //         className="btn btn-danger mt-3"
    //         onClick={deleteVisi}
    //         disabled={!visi || isLoading}
    //       >
    //         Hapus Visi
    //       </button>
    //     </div>

    //   </div>

    //   <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Tambah Visi</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <Form onSubmit={addVisi}>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Isi</Form.Label>
    //           <ReactQuill onChange={setVisi} required />
    //         </Form.Group>
    //         <Button variant="success" type="submit">Simpan</Button>
    //       </Form>
    //     </Modal.Body>
    //   </Modal>
    // </div>

    <div className="visi">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-center">Visi</h5>
        </div>
        <div className="card-body">
          {/* Tampilkan HTML visi */}
          <div dangerouslySetInnerHTML={{ __html: visi }} />
        </div>
      </div>

      <div className="form-edit">
        <ReactQuill value={visi} onChange={setVisi} className="custom-quill" />
        <p className="text-center mt-3">{message}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-update mt-3" onClick={updateVisi} disabled={!visi || isLoading}>
            {isLoading ? "Loading..." : "Update Visi"}
          </button>
          <Button
            className="btn btn-update mt-3"
            onClick={() => setShowAddModal(true)}
            disabled={!!visi || isLoading}
          >
            Tambahkan Visi
          </Button>
          <button className="btn btn-danger mt-3" onClick={deleteVisi} disabled={!visi || isLoading}>
            Hapus Visi
          </button>
        </div>
      </div>

      {/* Modal Tambah */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Visi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addVisi}>
            <Form.Group className="mb-3">
              <Form.Label>Isi</Form.Label>
              <ReactQuill onChange={setVisi} required />
            </Form.Group>
            <Button variant="success" type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminVisi;
