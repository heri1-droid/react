import React, { useEffect, useState } from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom";

export default function List() {
    // state fakultas
    const [fakultas, setFakultas] = useState([]);

    useEffect(() => {
        axios
            .get("https://academic-mi5a.vercel.app/api/api/fakultas")
            .then((response) => {
                console.log(response);
                setFakultas(response.data.data)
            })
    }, [])

    return (
        <>
            <h2>List Fakultas</h2>
            <NavLink to="/fakultas/Create" className="btn btn-primary mb-3">
                Create
            </NavLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Dekan</th>
                        <th>Singkatan</th>
                    </tr>
                </thead>
                <tbody>
                    {fakultas.map((data) => (
                        <tr key={data.id}>
                            <td>{data.nama}</td>
                            <td>{data.dekan}</td>
                            <td>{data.singkatan}</td>
                        </tr>
                    ))}
                </tbody>

            
            </table>
        </>
    )
}