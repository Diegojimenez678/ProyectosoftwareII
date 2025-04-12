import React, { useState, useEffect } from 'react';
import { listUZById, updateUZ } from '../../../service/uz';


const Modal = ({ closeModal, updateUzList, UzId, uzs }) => {
    const [formData, setFormData] = useState({
        uz_id: 0,
        uz_idestado: 0,
        uz_fecha_inicio: "",
        uz_hora_inicio: "",
        uz_unol: true,
        uz_dosl: true,
        uz_tresl: true,
        uz_cuatrol: true,
        uz_cincol: true,
        uz_seisl: true,        
        uz_unos: true,
        uz_doss: true,
        uz_tress: true,
        uz_cuatros: true,
        uz_cincos: true,
        uz_seiss: true,        
        uz_fecha_fin: "",
        uz_hora_fin: "",
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [UzData, setUzData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const uzDataResponse = await listUZById(UzId);
                setUzData(uzDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.messuze);
                setIsLoading(false);
            }
        };

        if (UzId) {
            fetchData();
        }
    }, [UzId]);

    useEffect(() => {
        if (UzData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                uz_idestado: UzData.uz_idestado,
                uz_fecha_inicio: UzData.uz_fecha_inicio,
                uz_hora_inicio: UzData.uz_hora_inicio,
                uz_unol: UzData.uz_unol,
                uz_dosl: UzData.uz_dosl,
                uz_tresl: UzData.uz_tresl,
                uz_cuatrol: UzData.uz_cuatrol,
                uz_cincol: UzData.uz_cincol,
                uz_seisl: UzData.uz_seisl,                
                uz_unos: UzData.uz_unos,
                uz_doss: UzData.uz_doss,
                uz_tress: UzData.uz_tress,
                uz_cuatros: UzData.uz_cuatros,
                uz_cincos: UzData.uz_cincos,
                uz_seiss: UzData.uz_seiss,                
                uz_fecha_fin: UzData.uz_fecha_fin,
                uz_hora_fin: UzData.uz_hora_fin,
            }));
        }
    }, [UzData]);

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
            await updateUZ(UzId, formData);
            updateUzList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.messuze);
        }
    };

    const letters = ['U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Prueba</h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    UzData && (
                        <>
                            <div className='row1-fecha'>
                                <div className='time-container'>
                                    <h2>Tiempo Inicial</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {UzData.uz_fecha_inicio}</h3>
                                        <h3 className="form-label">Hora: {UzData.uz_hora_inicio}</h3>
                                    </div>
                                </div>
                                <div className='time-container'>
                                    <h2>Tiempo Final</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {UzData.uz_fecha_fin}</h3>
                                        <h3 className="form-label">Hora: {UzData.uz_hora_fin}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='container-detailsuz'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['uz_unol', 'uz_dosl', 'uz_tresl', 'uz_cuatrol', 'uz_cincol', 'uz_seisl'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={UzData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={UzData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={UzData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['uz_unos', 'uz_doss', 'uz_tress', 'uz_cuatros', 'uz_cincos', 'uz_seiss'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={UzData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={UzData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={UzData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="language">
                                    <span className="en">Revisado</span>
                                    <input
                                        type="checkbox"
                                        name="uz_estado"
                                        className="check"
                                        checked={formData.uz_idestado === 2}
                                        onChange={(e) => {
                                            const value = e.target.checked ? 2 : 1;
                                            handleChange({ target: { name: 'uz_idestado', value } });
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
