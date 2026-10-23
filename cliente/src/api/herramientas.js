import axios from "axios";

const URL = 'http://localhost:8000';
const endpoint = `${URL}/api/herramientas`;

export const fetchHerramientas = () => axios.get(endpoint);
export const fetchHerramienta = (id) => axios.get(`${endpoint}/${id}`);
export const createHerramienta = (nueva) => axios.post(endpoint, nueva);
export const updateHerramienta = (id, datos) => axios.put(`${endpoint}/${id}`, datos);
export const deleteHerramienta = (id) => axios.delete(`${endpoint}/${id}`);