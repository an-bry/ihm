import axios from "axios";

const API_URL = "http://localhost/backend/rendez_vous";

export const getAppointments = async () => {
  return axios.get(`${API_URL}/read.php`);
};

export const getAppointment = async (id: number) => {
  return axios.get(`${API_URL}/detail.php?id=${id}`);
};

export const createAppointment = async (data: any) => {
  return axios.post(`${API_URL}/create.php`, data);
};

export const updateAppointment = async (data: any) => {
  return axios.post(`${API_URL}/update.php`, data);
};

export const deleteAppointment = async (id: number) => {
  return axios.post(`${API_URL}/delete.php`, { id });
};