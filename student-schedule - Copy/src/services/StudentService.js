import axios from "axios";

const API_URL = "http://localhost:9191/students";

const StudentService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  add: (student) => axios.post(API_URL, student),
  update: (id, student) => axios.put(`${API_URL}/${id}`, student),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
};

export default StudentService;
