import React, { useState, useEffect } from 'react';
import { listHNById, updateHN } from '../../../service/hn';
import './Modal.css';

const Modal = ({ closeModal, updateHnList, HnId, hns }) => {
    const [formData, setFormData] = useState({
        hn_id: 0,
        hn_idestado: 0,
        hn_fecha_inicio: "",
        hn_hora_inicio: "",
        hn_unol: true,
        hn_dosl: true,
        hn_tresl: true,
        hn_cuatrol: true,
        hn_cincol: true,
        hn_seisl: true,
        hn_sietel: true,
        hn_unos: true,
        hn_doss: true,
        hn_tress: true,
        hn_cuatros: true,
        hn_cincos: true,
        hn_seiss: true,
        hn_sietes: true,
        hn_fecha_fin: "",
        hn_hora_fin: "",
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [HnData, setHnData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const hnDataResponse = await listHNById(HnId);
                setHnData(hnDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.messhne);
                setIsLoading(false);
            }
        };

        if (HnId) {
            fetchData();
        }
    }, [HnId]);

    useEffect(() => {
        if (HnData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                hn_idestado: HnData.hn_idestado,
                hn_fecha_inicio: HnData.hn_fecha_inicio,
                hn_hora_inicio: HnData.hn_hora_inicio,
                hn_unol: HnData.hn_unol,
                hn_dosl: HnData.hn_dosl,
                hn_tresl: HnData.hn_tresl,
                hn_cuatrol: HnData.hn_cuatrol,
                hn_cincol: HnData.hn_cincol,
                hn_seisl: HnData.hn_seisl,
                hn_sietel: HnData.hn_sietel,
                hn_unos: HnData.hn_unos,
                hn_doss: HnData.hn_doss,
                hn_tress: HnData.hn_tress,
                hn_cuatros: HnData.hn_cuatros,
                hn_cincos: HnData.hn_cincos,
                hn_seiss: HnData.hn_seiss,
                hn_sietes: HnData.hn_sietes,
                hn_fecha_fin: HnData.hn_fecha_fin,
                hn_hora_fin: HnData.hn_hora_fin,
            }));
        }
    }, [HnData]);

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
            await updateHN(HnId, formData);
            updateHnList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.messhne);
        }
    };

    const letters = ['H', 'I', 'J', 'K', 'L', 'M', 'N'];

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Prueba</h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    HnData && (
                        <>
                            <div className='row1-fecha'>
                                <div className='time-container'>
                                    <h2>Tiempo Inicial</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {HnData.hn_fecha_inicio}</h3>
                                        <h3 className="form-label">Hora: {HnData.hn_hora_inicio}</h3>
                                    </div>
                                </div>
                                <div className='time-container'>
                                    <h2>Tiempo Final</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {HnData.hn_fecha_fin}</h3>
                                        <h3 className="form-label">Hora: {HnData.hn_hora_fin}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='container-detailsag'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['hn_unol', 'hn_dosl', 'hn_tresl', 'hn_cuatrol', 'hn_cincol', 'hn_seisl', 'hn_sietel'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={HnData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={HnData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={HnData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['hn_unos', 'hn_doss', 'hn_tress', 'hn_cuatros', 'hn_cincos', 'hn_seiss', 'hn_sietes'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={HnData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={HnData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={HnData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="language">
                                    <span className="en">Revisado</span>
                                    <input
                                        type="checkbox"
                                        name="hn_estado"
                                        className="check"
                                        checked={formData.hn_idestado === 2}
                                        onChange={(e) => {
                                            const value = e.target.checked ? 2 : 1;
                                            handleChange({ target: { name: 'hn_idestado', value } });
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
