import axios from 'axios';


const getClienteById = async (id, setState) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`);
    setState(response.data);
  } catch (error) {
    throw new Error("Error al obtener el cliente: " + error.message);
  }
};



const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/login", credentials);
    const { token, usu_id, session} = response.data;    
    const { uses_created_at, uses_expiration_timestamp, uses_active } = session;        
    localStorage.setItem('token', token);
    localStorage.setItem('usu_id', usu_id);   
    localStorage.setItem('active',uses_active);
    localStorage.setItem('session_created_at', uses_created_at);
    localStorage.setItem('session_expiration_timestamp', uses_expiration_timestamp);     
  } catch (error) {
    if (error.response) {
      console.error('Error de autenticación:', error.response.data.detail);
      throw new Error(error.response.data.detail);
    } else if (error.request) {      
      console.error('Error de red:', error.request);
      throw new Error('Error de red al intentar iniciar sesión');
    } else {      
      console.error('Error:', error.message);
      throw new Error('Error al intentar iniciar sesión');
    }
  }
};


const deactivateSessionCli = async (userId) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/deactivate-session/${userId}`);        
    localStorage.removeItem('token');
    localStorage.removeItem('active')
    localStorage.removeItem('usu_id');
    localStorage.removeItem('session_created_at');
    localStorage.removeItem('session_expiration_timestamp');
  } catch (error) {       
      console.error('Error de red:', error.request);
      throw new Error('Error de red al intentar desactivar la sesión');   
  }
};





const createCliente = async (sso_cliente) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/user", sso_cliente);
    
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error.message);
  }
};


export {
  createCliente,authenticateUser,getClienteById, deactivateSessionCli
};
