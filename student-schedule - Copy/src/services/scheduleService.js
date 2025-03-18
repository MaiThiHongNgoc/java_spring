import axios from 'axios';

const API_URL = 'http://localhost:9191/api/schedules';

const scheduleService = {
  // Get schedules for a specific student
  getStudentSchedules: (studentId) => {
    return axios.get(`${API_URL}/student/${studentId}`);
  },

  // Register a class for a student
  registerClass: (studentId, classScheduleId) => {
    return axios.post(`${API_URL}/register`, null, {
      params: { studentId, classScheduleId },
    });
  },

  // Update a schedule (e.g., switch classes)
  updateSchedule: (scheduleId, newClassScheduleId) => {
    return axios.put(`${API_URL}/${scheduleId}/update`, null, {
      params: { newClassScheduleId },
    });
  },

  // Delete a schedule
  deleteSchedule: (scheduleId) => {
    return axios.delete(`${API_URL}/${scheduleId}`);
  },
};

export default scheduleService;
