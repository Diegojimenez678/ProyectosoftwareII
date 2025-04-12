import React, { useEffect, useState } from 'react';
import { listAG } from '../../service/ag';
import Modalag from './Modales/Modalag';
import "./ag.css"
import { Link } from "react-router-dom";

const AG = () => {
    const [ag, setag] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [AgsPerPage] = useState(5);
    const [selectedAgId, setSelectedAgId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listAG(setag);
        }
    }, []);

    const openModal = (AgId) => {
        setSelectedAgId(AgId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAgId(null);
    };

    const updateAgList = async () => {
        await listAG(setag);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredAgs = ag && ag.filter(Ag => {
        return Ag.ag_fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const reversedAgs = filteredAgs ? [...filteredAgs].reverse() : null;

    const indexOfLastAg = currentPage * AgsPerPage;
    const indexOfFirstAg = indexOfLastAg - AgsPerPage;
    const currentAgs = reversedAgs && reversedAgs.slice(indexOfFirstAg, indexOfLastAg);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = reversedAgs ?
        Array.from({ length: Math.ceil(reversedAgs.length / AgsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = reversedAgs ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    
                    <h1 className="title-conte">Evaluaciones AG </h1> 
                    <Link className="aVolver" to="../Result">Volver</Link>
                    <div className="contenedor-productos">
                        <div className='header-product'>
                        <div className="search-container">
                                <input
                                    type="date"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por fecha"
                                    className="input-search"
                                />
                                {searchTerm && (
                                    <button className="clear-button" onClick={handleClearSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            {showModal && <Modalag closeModal={closeModal} updateAgList={updateAgList} AgId={selectedAgId} ags={ag} />}
                        </div>

                        {currentAgs ? (
                            <>
                            <div className="table-responsive">
                                <table className='tablaProducto'>
                                    <thead>
                                        <tr>
                                            <th>Fecha inicio</th>
                                            <th>Hora inicio</th>
                                            <th>Revisado</th>
                                            <th>Fecha fin</th>
                                            <th>Hora fin</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentAgs.map(ag => (
                                            <tr key={ag.ag_id}>
                                                <td>{ag.ag_fecha_inicio}</td>
                                                <td>{ag.ag_hora_inicio}</td>
                                                <td>
                                                    {ag.nombre_estado === 'Activo' ? (
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
                                                <td>{ag.ag_fecha_fin}</td>
                                                <td>{ag.ag_hora_fin}</td>
                                                <td>
                                                    <button className="button-edit" onClick={() => openModal(ag.ag_id)}>Revisar</button>
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

export default AG;
