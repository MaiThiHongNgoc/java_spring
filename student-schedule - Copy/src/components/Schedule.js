import React, { useEffect, useState } from "react";
import ScheduleService from "../services/scheduleService";
import "./Schedule.css";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [classScheduleId, setClassScheduleId] = useState("");
  const [editScheduleId, setEditScheduleId] = useState("");
  const [newClassScheduleId, setNewClassScheduleId] = useState("");

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await ScheduleService.getAllSchedules();
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
    }
  };

  const handleRegister = async () => {
    try {
      await ScheduleService.registerClass(studentId, classScheduleId);
      loadSchedules();
      setStudentId("");
      setClassScheduleId("");
    } catch (error) {
      console.error("Error registering class", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await ScheduleService.updateSchedule(editScheduleId, newClassScheduleId);
      loadSchedules();
      setEditScheduleId("");
      setNewClassScheduleId("");
    } catch (error) {
      console.error("Error updating schedule", error);
    }
  };

  const handleDelete = async (scheduleId) => {
    try {
      await ScheduleService.deleteSchedule(scheduleId);
      loadSchedules();
    } catch (error) {
      console.error("Error deleting schedule", error);
    }
  };

  return (
    <div className="schedule-container-101">
      <h2 className="schedule-title-102">Schedule Management</h2>

      {/* Đăng ký lớp */}
      <div className="schedule-form-103">
        <input
          type="text"
          className="schedule-input-104"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          className="schedule-input-104"
          placeholder="Class Schedule ID"
          value={classScheduleId}
          onChange={(e) => setClassScheduleId(e.target.value)}
        />
        <button className="schedule-button-105" onClick={handleRegister}>
          Register
        </button>
      </div>

      {/* Cập nhật lịch học */}
      <div className="schedule-form-103">
        <input
          type="text"
          className="schedule-input-104"
          placeholder="Schedule ID"
          value={editScheduleId}
          onChange={(e) => setEditScheduleId(e.target.value)}
        />
        <input
          type="text"
          className="schedule-input-104"
          placeholder="New Class Schedule ID"
          value={newClassScheduleId}
          onChange={(e) => setNewClassScheduleId(e.target.value)}
        />
        <button className="schedule-button-105" onClick={handleUpdate}>
          Update
        </button>
      </div>

      {/* Danh sách lịch học */}
      <h3 className="schedule-title-102">All Schedules</h3>
      <table className="schedule-table-107">
        <thead>
          <tr className="schedule-header-108">
            <th>ID</th>
            <th>Student</th>
            <th>Class</th>
            <th>Ngày bắt đầu đăng ký</th>
            <th>Ngày kết thúc đăng ký</th>
            <th>Ngày bắt đầu môn học</th>
            <th>Ngày kết thúc môn học</th>
            <th>Can Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="schedule-row-109 schedule-hover-112">
              <td>{schedule.id}</td>
              <td>{schedule.student.name}</td>
              <td>{schedule.classSchedule.classEntity.name}</td>
              <td>{schedule.classSchedule.registration_start}</td>
              <td>{schedule.classSchedule.registration_end}</td>
              <td>{schedule.classSchedule.course_start}</td>
              <td>{schedule.classSchedule.course_end}</td>
              <td>{schedule.canEdit ? "Yes" : "No"}</td>
              <td>
                <button
                  className="schedule-delete-btn-111"
                  onClick={() => handleDelete(schedule.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
