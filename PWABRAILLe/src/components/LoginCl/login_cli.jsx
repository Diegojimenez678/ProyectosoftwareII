import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from '../../service/Login_cli';
import { Link } from "react-router-dom";
import './login.css';

const LoginCli = () => {
  const [credentials, setCredentials] = useState({ cli_nickname: '', cli_clave: '' });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await authenticateUser(credentials);
      navigate("/Result");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false)
    }
  };



  return (
    <div className='root-home'>
      <div className='sesion'>
        <div className="login-container">
          <h2 className="login-title">Iniciar Sesión</h2>
          <label htmlFor="cli_nickname" className="input-label">Usuario:</label>
          <input
            type="text"
            id="cli_nickname"
            value={credentials.usu_nickname}
            onChange={(e) => setCredentials({ ...credentials, usu_nickname: e.target.value })}
            className="input-field"
          />

          <label htmlFor="cli_clave" className="input-label">Contraseña:</label>
          <input
            type="password"
            id="cli_clave"
            value={credentials.usu_clave}
            onChange={(e) => setCredentials({ ...credentials, usu_clave: e.target.value })}
            className="input-field"
          />
          <Link to="/verificaEmail" className="forgot-password-link">Olvidé mi contraseña</Link>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>                 
          
        </div>
      </div>



      {isLoading && (
        <div className="LoadingModal">
          <div className="LoadingSpinner"></div>
        </div>
      )}
    </div>
  );
};

export default LoginCli;
