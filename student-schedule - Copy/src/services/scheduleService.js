import axios from "axios";

const API_URL = "http://localhost:9191/api/schedules";

const ScheduleService = {
  getAllSchedules: () => axios.get(`${API_URL}/all`),
  getStudentSchedules: (studentId) => axios.get(`${API_URL}/student/${studentId}`),
  registerClass: (studentId, classScheduleId) =>
    axios.post(`${API_URL}/register`, null, {
      params: { studentId, classScheduleId },
    }),
  updateSchedule: (scheduleId, newClassScheduleId) =>
    axios.put(`${API_URL}/${scheduleId}/update`, null, {
      params: { newClassScheduleId },
    }),
  deleteSchedule: (scheduleId) => axios.delete(`${API_URL}/${scheduleId}`),
};

export default ScheduleService;
