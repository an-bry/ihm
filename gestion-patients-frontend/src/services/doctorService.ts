import axios from "axios";

const API_URL = "http://localhost/backend/doctors";

export const getDoctors = () => axios.get(`${API_URL}/read.php`);

export const createDoctor = (data: any) =>
  axios.post(`${API_URL}/create.php`, data);

export const updateDoctor = (data: any) =>
  axios.post(`${API_URL}/update.php`, data);

export const deleteDoctor = (data: any) =>
  axios.post(`${API_URL}/delete.php`, data);