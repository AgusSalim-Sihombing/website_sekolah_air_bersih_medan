import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../../../../../styles/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const AdminTujuan = () => {
  const [tujuan, setTujuan] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("Belum Ada Perubahan Data");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getTujuan();
  }, []);

  const getTujuan = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/tujuan`);
      const data = response.data[0];
      setTujuan(data ? data.tujuan : ""); // Kosongkan jika tidak ada data
    } catch (error) {
      console.error("Gagal mengambil data tujuan ", error);
    }
  };

  // Tambah data tujuan
  const addTujuan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/add-tujuan`, { tujuan });
      alert("Tujuan berhasil ditambahkan.");
      setShowAddModal(false);
      getTujuan(); // Refresh data
    } catch (error) {
      console.error("Gagal menambahkan tujuan:", error);
    }
  };


  // Perbarui Tujuan
  const updateTujuan = async () => {
    setLoading(true);
    setMessage("Data Sedang Diperbaharui...");

    try {
      const response = await axios.put(`${API_BASE_URL}/admin/update-tujuan`, { tujuan });
      if (response.status === 200) {
        await getTujuan();
        setMessage("Data Berhasil Diperbaharui ;)");
      }
    } catch (error) {
      console.error("Error saat memperbarui tujuan:", error);
      setMessage("Gagal Memperbaharui Data!");
    } finally {
      setLoading(false);
    }
  };

  const deleteTujuan = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus tujuan ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/delete-tujuan`);
      setTujuan(""); // Kosongkan editor ReactQuill
      alert("Tujuan berhasil dihapus.");
      setMessage("Tujuan berhasil dihapus.");
      getTujuan()
    } catch (error) {
      console.error("Gagal menghapus Tujuan :", error);
      setMessage("Gagal menghapus Tujuan");
    }
  };

  return (
    <div className="tujuan">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-center">Tujuan</h5>
        </div>
        <div className="card-body">
          {/* Tampilkan HTML tujuan */}
          <div dangerouslySetInnerHTML={{ __html: tujuan }} />
        </div>
      </div>

      <div className="form-edit">
        <ReactQuill value={tujuan} onChange={setTujuan} className="custom-quill" />
        <p className="text-center mt-3">{message}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-update mt-3" onClick={updateTujuan} disabled={!tujuan || isLoading}>
            {isLoading ? "Loading..." : "Update Tujuan"}
          </button>
          <Button
            className="btn btn-update mt-3"
            onClick={() => setShowAddModal(true)}
            disabled={!!tujuan || isLoading}
          >
            Tambahkan Tujuan
          </Button>
          <button className="btn btn-danger mt-3" onClick={deleteTujuan} disabled={!tujuan || isLoading}>
            Hapus Tujuan
          </button>
        </div>
      </div>

      {/* Modal Tambah */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Tujuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addTujuan}>
            <Form.Group className="mb-3">
              <Form.Label>Isi</Form.Label>
              <ReactQuill onChange={setTujuan} required />
            </Form.Group>
            <Button variant="success" type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminTujuan;
