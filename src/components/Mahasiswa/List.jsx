import React, {useEffect, useState} from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom";


export  default function List() {
     // state mahasiswa
    const [mahasiswa, setMahasiswa] = useState([]);

    useEffect( () => {
        axios
        .get("https://academic-mi5a.vercel.app/api/api/mahasiswa")
        .then( (response) => {
            console.log(response);
            setMahasiswa(response.data.data)
        })
    }, [] )

    return (
        <>
            <h2>List Mahasiswa</h2>
            <NavLink to="/mahasiswa/create" className="btn btn-primary mb-3">
                Create
            </NavLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>npm</th>
                        <th>Nama</th>
                        <th>Tanggal lahir</th>
                        <th>Tempat lahir</th>
                        <th>email</th>
                        <th>hp</th>
                        <th>alamat</th>
                        <th>prodi</th>
                        <th>Fakultas</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map( (data) => (
                        <tr key={data.id}>
                            <td>{data.npm}</td>
                            <td>{data.nama}</td>
                            <td>{data.tanggal_lahir}</td>
                            <td>{data.tempat_lahir}</td>
                            <td>{data.email}</td>
                            <td>{data.hp}</td>
                            <td>{data.alamat}</td>
                            <td>{data.prodi.nama}</td>
                            <td>{data.prodi.fakultas.nama}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}