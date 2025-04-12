import React, { useState, useEffect } from 'react';
import { listAGById, updateAG } from '../../../service/ag';
import './Modal.css';

const Modal = ({ closeModal, updateAgList, AgId, ags }) => {
    const [formData, setFormData] = useState({
        ag_id: 0,
        ag_idestado: 0,
        ag_fecha_inicio: "",
        ag_hora_inicio: "",
        ag_unol: true,
        ag_dosl: true,
        ag_tresl: true,
        ag_cuatrol: true,
        ag_cincol: true,
        ag_seisl: true,
        ag_sietel: true,
        ag_unos: true,
        ag_doss: true,
        ag_tress: true,
        ag_cuatros: true,
        ag_cincos: true,
        ag_seiss: true,
        ag_sietes: true,
        ag_fecha_fin: "",
        ag_hora_fin: "",
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [AgData, setAgData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const agDataResponse = await listAGById(AgId);
                setAgData(agDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        if (AgId) {
            fetchData();
        }
    }, [AgId]);

    useEffect(() => {
        if (AgData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                ag_idestado: AgData.ag_idestado,
                ag_fecha_inicio: AgData.ag_fecha_inicio,
                ag_hora_inicio: AgData.ag_hora_inicio,
                ag_unol: AgData.ag_unol,
                ag_dosl: AgData.ag_dosl,
                ag_tresl: AgData.ag_tresl,
                ag_cuatrol: AgData.ag_cuatrol,
                ag_cincol: AgData.ag_cincol,
                ag_seisl: AgData.ag_seisl,
                ag_sietel: AgData.ag_sietel,
                ag_unos: AgData.ag_unos,
                ag_doss: AgData.ag_doss,
                ag_tress: AgData.ag_tress,
                ag_cuatros: AgData.ag_cuatros,
                ag_cincos: AgData.ag_cincos,
                ag_seiss: AgData.ag_seiss,
                ag_sietes: AgData.ag_sietes,
                ag_fecha_fin: AgData.ag_fecha_fin,
                ag_hora_fin: AgData.ag_hora_fin,
            }));
        }
    }, [AgData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAG(AgId, formData);
            updateAgList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }
    };

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Prueba</h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    AgData && (
                        <>
                            <div className='row1-fecha'>
                                <div className='time-container'>
                                    <h2>Tiempo Inicial</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {AgData.ag_fecha_inicio}</h3>
                                        <h3 className="form-label">Hora: {AgData.ag_hora_inicio}</h3>
                                    </div>
                                </div>
                                <div className='time-container'>
                                    <h2>Tiempo Final</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {AgData.ag_fecha_fin}</h3>
                                        <h3 className="form-label">Hora: {AgData.ag_hora_fin}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='container-detailsag'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['ag_unol', 'ag_dosl', 'ag_tresl', 'ag_cuatrol', 'ag_cincol', 'ag_seisl', 'ag_sietel'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={AgData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={AgData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={AgData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['ag_unos', 'ag_doss', 'ag_tress', 'ag_cuatros', 'ag_cincos', 'ag_seiss', 'ag_sietes'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={AgData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={AgData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={AgData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="language">
                                    <span className="en">Revisado</span>
                                    <input
                                        type="checkbox"
                                        name="ag_estado"
                                        className="check"
                                        checked={formData.ag_idestado === 2}
                                        onChange={(e) => {
                                            const value = e.target.checked ? 2 : 1;
                                            handleChange({ target: { name: 'ag_idestado', value } });
                                        }}
                                    />
                                    <span className="es">Sin revisar</span>
                                </div>
                            </div>
                        </>
                    )
                )}

                <form onSubmit={handleSubmit}>
                    <button type="submit" className="form-button">Guardar cambios</button>
                    <button type="button" onClick={closeModal} className="close-modal-button">Cerrar</button>
                </form>
                {isLoading && (
                    <div className="LoadingModal">
                        <div className="LoadingSpinner"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
