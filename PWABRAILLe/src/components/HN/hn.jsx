import React, { useEffect, useState } from 'react';
import { listHN } from '../../service/hn';
import Modalhn from './Modales/Modalhn';
import "./hn.css"
import { Link } from "react-router-dom";

const HN = () => {
    const [hn, sethn] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [HnsPerPage] = useState(5);
    const [selectedHnId, setSelectedHnId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listHN(sethn);
        }
    }, []);

    const openModal = (HnId) => {
        setSelectedHnId(HnId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedHnId(null);
    };

    const updateHnList = async () => {
        await listHN(sethn);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredHns = hn && hn.filter(Hn => {
        return Hn.hn_fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const reversedHns = filteredHns ? [...filteredHns].reverse() : null;

    const indexOfLastHn = currentPage * HnsPerPage;
    const indexOfFirstHn = indexOfLastHn - HnsPerPage;
    const currentHns = reversedHns && reversedHns.slice(indexOfFirstHn, indexOfLastHn);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = reversedHns ?
        Array.from({ length: Math.ceil(reversedHns.length / HnsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = reversedHns ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Evaluaciones HN</h1>
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

                            {showModal && <Modalhn closeModal={closeModal} updateHnList={updateHnList} HnId={selectedHnId} hns={hn} />}
                        </div>

                        {currentHns ? (
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
                                            {currentHns.map(hn => (
                                                <tr key={hn.hn_id}>
                                                    <td>{hn.hn_fecha_inicio}</td>
                                                    <td>{hn.hn_hora_inicio}</td>
                                                    <td>
                                                        {hn.nombre_estado === 'Activo' ? (
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
                                                    <td>{hn.hn_fecha_fin}</td>
                                                    <td>{hn.hn_hora_fin}</td>
                                                    <td>
                                                        <button className="button-edit" onClick={() => openModal(hn.hn_id)}>Revisar</button>
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

export default HN;
