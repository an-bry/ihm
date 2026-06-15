import axios from "axios";

const API_URL = "http://localhost/backend/consultations";

export const getConsultations = async () => {
  return axios.get(`${API_URL}/read.php`);
};

export const createConsultation = async (data: any) => {
  return axios.post(`${API_URL}/create.php`, data);
};

export const updateConsultation = async (data: any) => {
  return axios.put(`${API_URL}/update.php`, data);
};

export const deleteConsultation = async (id: number) => {
  return axios.delete(`${API_URL}/delete.php`, {
    data: { id },
  });
};