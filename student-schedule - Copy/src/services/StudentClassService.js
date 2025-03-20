import axios from "axios";

const API_URL = "http://localhost:9191/api/student-classes";

const StudentClassService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  add: (studentClass) => axios.post(API_URL, studentClass),
  update: (id, studentClass) => axios.put(`${API_URL}/${id}`, studentClass),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
  addStudentToClass: (studentId, classId) =>
    axios.post(`${API_URL}/add-student`, null, {
      params: { studentId, classId },
    }),
  transferStudent: (studentId, oldClassId, newClassId) =>
    axios.put(`${API_URL}/transfer-student`, null, {
      params: { studentId, oldClassId, newClassId },
    }),
  removeStudentFromClass: (studentId, classId) =>
    axios.delete(`${API_URL}/remove-student`, {
      params: { studentId, classId },
    }),
  getStudentsByClass: (classId) => axios.get(`${API_URL}/by-class/${classId}`),
};

export default StudentClassService;
