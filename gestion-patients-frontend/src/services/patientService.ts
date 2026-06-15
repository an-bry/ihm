import axios from "axios";

const API_URL = "http://localhost/backend/patients";

export const createPatient = (data: any) => {
  return axios.post(`${API_URL}/create.php`, data);
};

export const getPatients = () => {
  return axios.get(`${API_URL}/read.php`);
};

export const getPatient = (id: number) => {
  return axios.get(`${API_URL}/detail.php?id=${id}`);
};

export const updatePatient = (data: any) => {
  return axios.put(`${API_URL}/update.php`, data);
};

export const deletePatient = (id: number) => {
  return axios.delete(`${API_URL}/delete.php`, {
    data: { id },
  });
};