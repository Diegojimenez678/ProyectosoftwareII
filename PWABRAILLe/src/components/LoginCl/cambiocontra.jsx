import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../service/cambiocontra';
import './cambiocontra.css';  // Assuming you have a CSS file for styling

const CambioContra = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      setIsLoading(true);
      await resetPassword({ token, new_password: newPassword });
      setIsLoading(false);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Error al cambiar la contraseña: " + error.message);
    }
  };

  return (
    <div className='root-home'>
      <div className='center'>
        <div className="forgot-password-container">
          <h2 className='reset-password-title'>Cambiar Contraseña</h2>
          <form onSubmit={handleSubmit} className="reset-password-form">
            <label htmlFor="newPassword" className="input-label">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              required
            />
            <label htmlFor="confirmPassword" className="input-label">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="reset-button" disabled={isLoading}>
              {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
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

export default CambioContra;
