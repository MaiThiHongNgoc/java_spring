import axios from "axios";

const API_URL = "http://localhost:9191/api/classes"; // Thay bằng URL backend của bạn

const classService = {
  getAllClasses: () => axios.get(API_URL),
  getClassById: (id) => axios.get(`${API_URL}/${id}`),
  addClass: (newClass) => axios.post(API_URL, newClass),
  updateClass: (id, classData) => axios.put(`${API_URL}/${id}`, classData),
  deleteClass: (id) => axios.delete(`${API_URL}/${id}`),
};

export default classService;
