import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const AdminMisi = () => {
  const [misi, setMisi] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("Belum Ada Perubahan Data");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getMisi();
  }, []);

  const getMisi = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/misi`);
      const data = response.data[0];
      setMisi(data ? data.misi : ""); // Kosongkan jika tidak ada data
    } catch (error) {
      console.error("Gagal mengambil data misi ", error);
    }
  };

  // Tambah data misi
  const addMisi = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/add-misi`, { misi });
      alert("Misi berhasil ditambahkan.");
      setShowAddModal(false);
      getMisi(); // Refresh data
    } catch (error) {
      console.error("Gagal menambahkan misi:", error);
    }
  };


  // Perbarui Misi
  const updateMisi = async () => {
    setLoading(true);
    setMessage("Data Sedang Diperbaharui...");

    try {
      const response = await axios.put(`${API_BASE_URL}/admin/update-misi`, { misi });
      if (response.status === 200) {
        await getMisi();
        setMessage("Data Berhasil Diperbaharui ;)");
      }
    } catch (error) {
      console.error("Error saat memperbarui misi:", error);
      setMessage("Gagal Memperbaharui Data!");
    } finally {
      setLoading(false);
    }
  };

  const deleteMisi = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus misi ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/delete-misi`);
      setMisi(""); // Kosongkan editor ReactQuill
      alert("Misi berhasil dihapus.");
      setMessage("Misi berhasil dihapus.");
      getMisi()
    } catch (error) {
      console.error("Gagal menghapus Misi :", error);
      setMessage("Gagal menghapus Misi");
    }
  };

  return (
    <div className="misi">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-center">Misi</h5>
        </div>
        <div className="card-body">
          {/* Tampilkan HTML misi */}
          <div dangerouslySetInnerHTML={{ __html: misi }} />
        </div>
      </div>

      <div className="form-edit">
        <ReactQuill value={misi} onChange={setMisi} className="custom-quill" />
        <p className="text-center mt-3">{message}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-update mt-3" onClick={updateMisi} disabled={!misi || isLoading}>
            {isLoading ? "Loading..." : "Update Misi"}
          </button>
          <Button
            className="btn btn-update mt-3"
            onClick={() => setShowAddModal(true)}
            disabled={!!misi || isLoading}
          >
            Tambahkan Misi
          </Button>
          <button className="btn btn-danger mt-3" onClick={deleteMisi} disabled={!misi || isLoading}>
            Hapus Misi
          </button>
        </div>
      </div>

      {/* Modal Tambah */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Misi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addMisi}>
            <Form.Group className="mb-3">
              <Form.Label>Isi</Form.Label>
              <ReactQuill onChange={setMisi} required />
            </Form.Group>
            <Button variant="success" type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminMisi;
