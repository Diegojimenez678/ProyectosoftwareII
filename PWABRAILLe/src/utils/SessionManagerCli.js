// SessionManager.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deactivateSessionCli } from '../service/Login_cli';

const SessionManagerCli = () => {
    const navigate = useNavigate();
    

    useEffect(() => {
        const logout = () => {
            console.log('Cerrando sesión...');
            localStorage.removeItem('token');
            localStorage.removeItem('usu_id');
            localStorage.removeItem('active');
            localStorage.removeItem('session_created_at');
            localStorage.removeItem('session_expiration_timestamp');
            navigate('/login');
        };

        

        const handleLogout = async () => {
            const userId = localStorage.getItem('usu_id');
            if (!userId) {
                console.error('No se pudo obtener el ID del usuario desde el almacenamiento local.');
                return;
            }
    
            try {
                
                await deactivateSessionCli(userId);
                
                navigate("/login");
            } catch (error) {
                console.error('Error al intentar cerrar sesión:', error.message);
                
            }
        };

        const checkSessionExpiration = () => {
            const sessionExpirationTimestamp = localStorage.getItem('session_expiration_timestamp');           
            if (sessionExpirationTimestamp) {
                const expirationTime = new Date(sessionExpirationTimestamp).getTime();
                const currentTime = new Date().getTime();                
                if (currentTime > expirationTime) {
                    handleLogout();
                    logout();
                }
            }
        };
        
        const interval = setInterval(checkSessionExpiration, 300000);            
        checkSessionExpiration();        
        return () => clearInterval(interval);
    }, [navigate]);

    return null;
};

export default SessionManagerCli;
