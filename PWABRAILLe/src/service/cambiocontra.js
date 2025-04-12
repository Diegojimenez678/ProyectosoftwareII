import axios from 'axios';

const verifyEmail = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-emailUsu`, data);
        const { expiration, correo } = response.data;                        
        localStorage.setItem('expiration_timestamp', expiration); 
        localStorage.setItem('correo', correo); 
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};

const validCode = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/valid-codeUsu`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};

const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reset-passwordUsu`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};



const deletecode = async (correo) => {
    try {      
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-codeUsu`, {data: { correo: correo }});      
      return response.data; 
    } catch (error) {
      throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
  };
  

export { verifyEmail, validCode, resetPassword,deletecode };