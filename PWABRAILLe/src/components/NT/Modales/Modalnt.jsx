import React, { useState, useEffect } from 'react';
import { listNTById, updateNT } from '../../../service/nt';
import './Modal.css';

const Modal = ({ closeModal, updateNtList, NtId, nts }) => {
    const [formData, setFormData] = useState({
        nt_id: 0,
        nt_idestado: 0,
        nt_fecha_inicio: "",
        nt_hora_inicio: "",
        nt_unol: true,
        nt_dosl: true,
        nt_tresl: true,
        nt_cuatrol: true,
        nt_cincol: true,
        nt_seisl: true,
        nt_sietel: true,
        nt_unos: true,
        nt_doss: true,
        nt_tress: true,
        nt_cuatros: true,
        nt_cincos: true,
        nt_seiss: true,
        nt_sietes: true,
        nt_fecha_fin: "",
        nt_hora_fin: "",
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [NtData, setNtData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const ntDataResponse = await listNTById(NtId);
                setNtData(ntDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.messnte);
                setIsLoading(false);
            }
        };

        if (NtId) {
            fetchData();
        }
    }, [NtId]);

    useEffect(() => {
        if (NtData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                nt_idestado: NtData.nt_idestado,
                nt_fecha_inicio: NtData.nt_fecha_inicio,
                nt_hora_inicio: NtData.nt_hora_inicio,
                nt_unol: NtData.nt_unol,
                nt_dosl: NtData.nt_dosl,
                nt_tresl: NtData.nt_tresl,
                nt_cuatrol: NtData.nt_cuatrol,
                nt_cincol: NtData.nt_cincol,
                nt_seisl: NtData.nt_seisl,
                nt_sietel: NtData.nt_sietel,
                nt_unos: NtData.nt_unos,
                nt_doss: NtData.nt_doss,
                nt_tress: NtData.nt_tress,
                nt_cuatros: NtData.nt_cuatros,
                nt_cincos: NtData.nt_cincos,
                nt_seiss: NtData.nt_seiss,
                nt_sietes: NtData.nt_sietes,
                nt_fecha_fin: NtData.nt_fecha_fin,
                nt_hora_fin: NtData.nt_hora_fin,
            }));
        }
    }, [NtData]);

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
            await updateNT(NtId, formData);
            updateNtList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.messnte);
        }
    };

    const letters = ['Ñ', 'O', 'P', 'Q', 'R', 'S', 'T'];

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Prueba</h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    NtData && (
                        <>
                            <div className='row1-fecha'>
                                <div className='time-container'>
                                    <h2>Tiempo Inicial</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {NtData.nt_fecha_inicio}</h3>
                                        <h3 className="form-label">Hora: {NtData.nt_hora_inicio}</h3>
                                    </div>
                                </div>
                                <div className='time-container'>
                                    <h2>Tiempo Final</h2>
                                    <div className='time-details'>
                                        <h3 className="form-label">Fecha: {NtData.nt_fecha_fin}</h3>
                                        <h3 className="form-label">Hora: {NtData.nt_hora_fin}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='container-detailsnt'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['nt_unol', 'nt_dosl', 'nt_tresl', 'nt_cuatrol', 'nt_cincol', 'nt_seisl', 'nt_sietel'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={NtData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={NtData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={NtData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['nt_unos', 'nt_doss', 'nt_tress', 'nt_cuatros', 'nt_cincos', 'nt_seiss', 'nt_sietes'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong>{letters[index]}</strong></p>
                                            <button className={NtData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={NtData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={NtData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="language">
                                    <span className="en">Revisado</span>
                                    <input
                                        type="checkbox"
                                        name="nt_estado"
                                        className="check"
                                        checked={formData.nt_idestado === 2}
                                        onChange={(e) => {
                                            const value = e.target.checked ? 2 : 1;
                                            handleChange({ target: { name: 'nt_idestado', value } });
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
