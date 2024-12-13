/* eslint-disable no-unused-vars */
// src/components/Fakultas/Create.jsx
import React, { useState, useEffect } from "react";

import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateProdi() {
    // Inisialisasi state untuk menyimpan nama fakultas
    const [npmMahasiswa, setNpmMahasiswa] = useState("");
    const [nama, setNama] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [prodiId, setProdiId] = useState("");
    const [fakultasId, setFakultasId] = useState("");

    // Inisialisasi state untuk menyimpan daftar fakultas
    const [fakultasList, setFakultasList] = useState([]);

    const [prodiList, setProdiList] = useState([]);
    // Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProdi = async () => {
            try {
                const response = await axios.get(
                    "https://academic-mi5a.vercel.app/api/api/prodi"
                );
                console.log(response.data);  // Tambahkan log untuk memeriksa struktur data

                // Periksa struktur data yang tepat
                if (response.data && Array.isArray(response.data.data)) {
                    setProdiList(response.data.data);
                } else if (response.data && Array.isArray(response.data.result)) {
                    setProdiList(response.data.result);
                } else {
                    setError("Unexpected data structure");
                }
            } catch (error) {
                setError("Failed to fetch Prodi data");
                console.error(error);
            }
        };

        fetchProdi();
    }, []);

    useEffect(() => {
        const fetchFakultas = async () => {
            try {
                const response = await axios.get(
                    "https://academic-mi5a.vercel.app/api/api/fakultas"
                );
                console.log(response.data);  // Tambahkan log untuk memeriksa struktur data

                // Periksa struktur data yang tepat
                if (response.data && Array.isArray(response.data.data)) {
                    setFakultasList(response.data.data);
                } else if (response.data && Array.isArray(response.data.result)) {
                    setFakultasList(response.data.result);
                } else {
                    setError("Unexpected data structure");
                }
            } catch (error) {
                setError("Failed to fetch fakultas data");
                console.error(error);
            }
        };

        fetchFakultas();
    }, []);

    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess(""); 
    
        // Validasi input (tetap sama seperti sebelumnya)
        // ...
    
        try {
            // Tambahkan console.log untuk payload
            const payload = {
                npm: npmMahasiswa,
                nama: nama,
                tanggal_lahir: tanggalLahir,
                tempat_lahir: tempatLahir,
                email: email,
                hp: hp,
                alamat: alamat,
                prodi_id: prodiId,
                fakultas_id: fakultasId
            };
    
            console.log("Payload being sent:", payload);
    
            const response = await axios.post(
                "https://academic-mi5a.vercel.app/api/api/mahasiswa", 
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            // Log full response
            console.log("Full Response:", response);
            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);
    
            // Perluas kondisi keberhasilan
            if (response.status === 201 || response.status === 200) {
                setSuccess("Mahasiswa created successfully!");
                // Reset form
                setNpmMahasiswa("");
                setNama("");
                setTanggalLahir("");
                setTempatLahir("");
                setEmail("");
                setHp("");
                setProdiId("");
                setFakultasId("");
            } else {
                setError(`Failed to create mahasiswa. Status: ${response.status}`);
            }
        } catch (error) {
            // Logging yang lebih detail untuk error
            console.error("Full error object:", error);
            
            if (error.response) {
                // Server responded with an error status code
                console.error("Server error response:", error.response.data);
                console.error("Status code:", error.response.status);
                setError(error.response.data.message || "Failed to create mahasiswa");
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
                setError("No response from server");
            } else {
                // Something else went wrong
                console.error("Error setting up request:", error.message);
                setError("An error occurred while creating mahasiswa");
            }
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Mahasiswa</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
            {/* Form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>
                {/* Tangani event submit dengan handleSubmit */}
                <div className="mb-3">
                    <label className="form-label">
                        Npm
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="npmMahasiswa"
                        value={npmMahasiswa} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNpmMahasiswa(e.target.value)} // Update state saat input berubah
                        placeholder="Enter NPM Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Nama
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="nama"
                        value={nama} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNama(e.target.value)} // Update state saat input berubah
                        placeholder="Enter Nama Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Tanggal Lahir
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="tanggalLahir"
                        value={tanggalLahir} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setTanggalLahir(e.target.value)} // Update state saat input berubah
                        placeholder="Enter Nama Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Tempat Lahir
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="tempatLahir"
                        value={tempatLahir} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setTempatLahir(e.target.value)} // Update state saat input berubah
                        placeholder="Enter tempat Lahir Nama" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        email
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="email"
                        value={email} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
                        placeholder="Enter Email Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Hp
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="hp"
                        value={hp} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setHp(e.target.value)} // Update state saat input berubah
                        placeholder="Enter Hp Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Alamat
                    </label>
                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="alamat"
                        value={alamat} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setAlamat(e.target.value)} // Update state saat input berubah
                        placeholder="Enter Hp Name" // Placeholder teks untuk input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prodi</label>
                    {/* Dropdown untuk memilih fakultas */}
                    <select
                        className="form-select"
                        id="prodiId"
                        value={prodiId} // Nilai dropdown disimpan di state fakultasId
                        onChange={(e) => setProdiId(e.target.value)} // Update state saat pilihan berubah
                    >
                        <option value="">Select Prodi</option>
                        {prodiList.map((prodi) => (
                            <option key={prodi.id} value={prodi.id}>
                                {/* Set key dan value untuk masing-masing fakultas */}
                                {prodi.nama} {/* Nama fakultas sebagai teks di dropdown */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fakultas</label>
                    {/* Dropdown untuk memilih fakultas */}
                    <select
                        className="form-select"
                        id="fakultasId"
                        value={fakultasId} // Nilai dropdown disimpan di state fakultasId
                        onChange={(e) => setFakultasId(e.target.value)} // Update state saat pilihan berubah
                    >
                        <option value="">Select Fakultas</option>
                        {fakultasList.map((fakultas) => (
                            <option key={fakultas.id} value={fakultas.id}>
                                {/* Set key dan value untuk masing-masing fakultas */}
                                {fakultas.nama} {/* Nama fakultas sebagai teks di dropdown */}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}
