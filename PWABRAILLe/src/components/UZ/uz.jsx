import React, { useEffect, useState } from 'react';
import { listUZ } from '../../service/uz';
import Modaluz from './Modales/Modaluz';
import "./uz.css"
import { Link } from "react-router-dom";

const UZ = () => {
    const [uz, setuz] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [UzsPerPage] = useState(5);
    const [selectedUzId, setSelectedUzId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listUZ(setuz);
        }
    }, []);

    const openModal = (UzId) => {
        setSelectedUzId(UzId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUzId(null);
    };

    const updateUzList = async () => {
        await listUZ(setuz);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredUzs = uz && uz.filter(Uz => {
        return Uz.uz_fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const reversedUzs = filteredUzs ? [...filteredUzs].reverse() : null;

    const indexOfLastUz = currentPage * UzsPerPage;
    const indexOfFirstUz = indexOfLastUz - UzsPerPage;
    const currentUzs = reversedUzs && reversedUzs.slice(indexOfFirstUz, indexOfLastUz);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = reversedUzs ?
        Array.from({ length: Math.ceil(reversedUzs.length / UzsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = reversedUzs ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];


    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Evaluaciones UZ</h1>
                    <Link className="aVolver" to="../Result">Volver</Link>
                    <div className="contenedor-productos">
                        <div className='header-product'>
                            <div className="search-container">
                                <input
                                    type="Date"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por fecha"
                                    className="input-search"
                                />
                                {searchTerm && (
                                    <button className="clear-button" onClick={handleClearSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {showModal && <Modaluz closeModal={closeModal} updateUzList={updateUzList} UzId={selectedUzId} uzs={uz} />}
                        </div>

                        {currentUzs ? (
                            <>
                                <div className="table-responsive">
                                    <table className='tablaProducto'>
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Hora</th>
                                                <th>Revisado</th>
                                                <th>Fecha fin</th>
                                                <th>Hora fin</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUzs.map(uz => (
                                                <tr key={uz.uz_id}>
                                                    <td>{uz.uz_fecha_inicio}</td>
                                                    <td>{uz.uz_hora_inicio}</td>
                                                    <td>
                                                        {uz.nombre_estado === 'Activo' ? (
                                                            <button className="button-circle-green">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M5 12l5 5l10 -10" />
                                                                </svg>
                                                            </button>
                                                        ) : (
                                                            <button className="button-circle-red">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M18 6l-12 12" />
                                                                    <path d="M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td>{uz.uz_fecha_fin}</td>
                                                    <td>{uz.uz_hora_fin}</td>
                                                    <td>
                                                        <button className="button-edit" onClick={() => openModal(uz.uz_id)}>Revisar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button onClick={() => paginate(1)} className="page-link">&laquo;</button>
                                    </li>
                                    {pages.map(page => (
                                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                            <button onClick={() => paginate(page)} className="page-link">{page}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button onClick={() => paginate(pageNumbers.length)} className="page-link">&raquo;</button>
                                    </li>
                                </ul>
                            </>
                        ) : ('No hay Datos')}
                    </div>
                </main>
            )}
        </>
    );
};

export default UZ;
