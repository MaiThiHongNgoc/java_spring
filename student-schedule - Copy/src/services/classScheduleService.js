import axios from "axios";

const API_URL = "http://localhost:9191/api/class-schedules";

const getAllSchedules = () => axios.get(API_URL);
const getScheduleById = (id) => axios.get(`${API_URL}/${id}`);
const createSchedule = (schedule) => axios.post(API_URL, schedule);
const updateSchedule = (id, schedule) => axios.put(`${API_URL}/${id}`, schedule);
const deleteSchedule = (id) => axios.delete(`${API_URL}/${id}`);
const getSchedulesByStatus = (status) => axios.get(`${API_URL}/status/${status}`);

export default {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedulesByStatus,
};
