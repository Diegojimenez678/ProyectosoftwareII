import axios from 'axios';
import JwtCli from '../utils/jwt';

const listHN = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/hn");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const listHNById = async (id) => {
    try {
        JwtCli();
        const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/hn/${id}`);
        return peticion.data
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateHN = async (hnId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/hn/${hnId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listHN, updateHN,listHNById };