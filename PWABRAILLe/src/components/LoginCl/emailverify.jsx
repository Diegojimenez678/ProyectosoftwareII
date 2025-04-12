import React, { useState } from 'react';
import { verifyEmail } from '../../service/cambiocontra'; 
import { useNavigate } from "react-router-dom";
import './emailverify.css'

const Emailverify = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) return;
    try {
      setIsLoading(true);
      await verifyEmail({ correo: email });            
      setFormSubmitted(true);
      navigate("/validaCodigo");
    } catch (error) {
      setErrorMessage("Error al enviar el formulario: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='root-home'>
      <div className='center'>
      <div className="forgot-password-container">
        <h2 className="reset-password-title">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label htmlFor="email" className="input-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="reset-button" disabled={isLoading || formSubmitted}>
            {isLoading ? 'Enviando...' : 'Enviar Código de Verificación'}
          </button>
        </form>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {isLoading && (
          <div className="LoadingModal">
            <div className="LoadingSpinner"></div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Emailverify;
