import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const LamaranList = () => {
    const [lamarans, setLamarans] = useState([]);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        getLamarans();
    }, []);

    const getLamarans = async () => {
        const response = await axios.get("http://localhost:5000/lamarans");
        setLamarans(response.data);
    };

    const deleteLamaran = async (lamaranId) => {
        await axios.delete(`http://localhost:5000/lamarans/${lamaranId}`);
        getLamarans();
    }

    return (
        <div>
            <h1 className="title">Lamaran</h1>
            <h2 className="subtitle">List of Lamaran</h2>
            {user && user.role !== "admin" ?
                <Link to="/lamarans/add" className="button is-success is-small my-2" style={{ fontWeight: "bold" }}>
                    <IoAdd />
                    Add New
                </Link>
                : ""
            }
            <table className='table is-stripped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Posisi</th>
                        <th>Deskripsi</th>
                        <th>Pengalaman</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {lamarans.map((lamarans, index) => (
                        <tr key={lamarans.uuid}>
                            <td>{index + 1}</td>
                            <td>{lamarans.name}</td>
                            <td>{lamarans.posisi}</td>
                            <td>{lamarans.deskripsi}</td>
                            <td>{lamarans.pengalaman}</td>
                            <td>
                                {user && user.role !== "admin" ?
                                    <Link to={`/lamarans/edit/${lamarans.uuid}`} className='button is-small is-info'>Edit</Link>
                                    : ""
                                }
                                <button onClick={() => deleteLamaran(lamarans.uuid)} className="button is-small is-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LamaranList;