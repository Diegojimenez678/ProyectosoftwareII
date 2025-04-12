// SessionManager.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletecode} from '../service/cambiocontra';

const Expiracontra = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const contra = () => {
            localStorage.removeItem('correo');
            localStorage.removeItem('expiration_timestamp');
            navigate('/login');
        };


        
        const handlecontra = async () => {
            const correo = localStorage.getItem('correo');            
            if (!correo) {
                console.error('No se pudo obtener el correo del usuario desde el almacenamiento local.');
                return;
            }
    
            try {
                
                await deletecode(correo);                
                navigate("/login");
            } catch (error) {
                console.error('Error al intentar cambiar la contraseña:', error.message);
                
            }
        };

        const checkExpiration = () => {
            const sessionExpirationTimestamp = localStorage.getItem('expiration_timestamp');           
            if (sessionExpirationTimestamp) {
                const expirationTime = new Date(sessionExpirationTimestamp).getTime();
                const currentTime = new Date().getTime();                
                if (currentTime > expirationTime) {
                    handlecontra();
                    contra();
                }
            }
        };
        
        const interval = setInterval(checkExpiration, 120000);            
        checkExpiration();        
        return () => clearInterval(interval);
    }, [navigate]);

    return null;
};

export default Expiracontra;
