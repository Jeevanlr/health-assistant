import axios from 'axios';

const API_BASE = 'http://192.168.1.17:5000';

export const predictPreDiabetes = (data) => axios.post(`${API_BASE}/predict/pre-diabetes`, data).then(res => res.data);
export const predictPreHeart = (data) => axios.post(`${API_BASE}/predict/pre-heart`, data).then(res => res.data);
export const predictPreParkinsons = (data) => axios.post(`${API_BASE}/predict/pre-parkinsons`, data).then(res => res.data);
export const predictPreBreast = (data) => axios.post(`${API_BASE}/predict/pre-breast`, data).then(res => res.data);
export const predictDiabetes = (data) => axios.post(`${API_BASE}/predict/diabetes`, data).then(res => res.data);
export const predictHeart = (data) => axios.post(`${API_BASE}/predict/heart`, data).then(res => res.data);
export const predictParkinson = (data) => axios.post(`${API_BASE}/predict/parkinsons`, data).then(res => res.data);
export const predictBreast = (data) => axios.post(`${API_BASE}/predict/breast`, data).then(res => res.data);
export const predictSymptom = (data) => axios.post(`${API_BASE}/predict/symptom`, data).then(res => res.data);
