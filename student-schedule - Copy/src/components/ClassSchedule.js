import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons
import classScheduleService from "../services/classScheduleService";
import "./ClassSchedule.css";

const ClassSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({
    classEntity: { id: "" },
    fixedStartTime: "",
    lessonsPerWeek: "",
    registrationStart: "",
    registrationEnd: "",
    courseStart: "",
    courseEnd: "",
    status: "ACTIVE",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(""); // State để hiển thị lỗi

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const res = await classScheduleService.getAllSchedules();
      setSchedules(res.data);
    } catch (error) {
      console.error("Lỗi tải lịch học:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.classEntity.id || isNaN(form.classEntity.id)) {
      setError("Vui lòng nhập ID lớp học hợp lệ!");
      return;
    }

    const payload = {
      ...form,
      classEntity: { id: Number(form.classEntity.id) }, // Đảm bảo ID là số
    };

    try {
      if (editingId) {
        await classScheduleService.updateSchedule(editingId, payload);
      } else {
        await classScheduleService.createSchedule(payload);
      }

      setForm({
        classEntity: { id: "" },
        fixedStartTime: "",
        lessonsPerWeek: "",
        registrationStart: "",
        registrationEnd: "",
        courseStart: "",
        courseEnd: "",
        status: "ACTIVE",
      });

      setEditingId(null);
      setError(""); // Xóa lỗi nếu thành công
      loadSchedules();
    } catch (error) {
      setError(error.response?.data || "Có lỗi xảy ra khi lưu lịch học!");
      console.error("Lỗi gửi dữ liệu:", error);
    }
  };

  const handleEdit = (schedule) => {
    setForm(schedule);
    setEditingId(schedule.id);
    setError(""); // Xóa lỗi khi chỉnh sửa
  };

  const handleDelete = async (id) => {
    try {
      await classScheduleService.deleteSchedule(id);
      loadSchedules();
    } catch (error) {
      setError("Không thể xóa lịch học này!");
      console.error("Lỗi xóa lịch học:", error);
    }
  };

  return (
    <div className="class-schedule-container">
      <h2>Quản lý Lịch Học</h2>
      {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi */}

      <form className="class-schedule-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID lớp học"
          value={form.classEntity.id}
          onChange={(e) => {
            const value = e.target.value.trim();
            if (/^\d*$/.test(value)) {
              setForm({ ...form, classEntity: { id: value ? Number(value) : "" } });
            }
          }}
          required
        />
        <input
          type="time"
          placeholder="Giờ bắt đầu"
          value={form.fixedStartTime}
          onChange={(e) => setForm({ ...form, fixedStartTime: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Số tiết/tuần"
          value={form.lessonsPerWeek}
          onChange={(e) => setForm({ ...form, lessonsPerWeek: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Ngày đăng ký"
          value={form.registrationStart}
          onChange={(e) => setForm({ ...form, registrationStart: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Ngày kết thúc đăng ký"
          value={form.registrationEnd}
          onChange={(e) => setForm({ ...form, registrationEnd: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Ngày bắt đầu khóa học"
          value={form.courseStart}
          onChange={(e) => setForm({ ...form, courseStart: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Ngày kết thúc khóa học"
          value={form.courseEnd}
          onChange={(e) => setForm({ ...form, courseEnd: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="ACTIVE">Hoạt động</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="CANCELED">Hủy</option>
        </select>
        <button type="submit">
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
      </form>

      <table className="class-schedule-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lớp</th>
            <th>Giờ bắt đầu</th>
            <th>Số tiết/tuần</th>
            <th>Ngày đăng ký</th>
            <th>Ngày kết thúc đăng ký</th>
            <th>Ngày bắt đầu học</th>
            <th>Ngày kết thúc học</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.classEntity.name}</td>
              <td>{schedule.fixedStartTime}</td>
              <td>{schedule.lessonsPerWeek}</td>
              <td>{schedule.registrationStart}</td>
              <td>{schedule.registrationEnd}</td>
              <td>{schedule.courseStart}</td>
              <td>{schedule.courseEnd}</td>
              <td>{schedule.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(schedule)}>
                  <FaEdit /> Sửa
                </button>
                <button className="delete-btn" onClick={() => handleDelete(schedule.id)}>
                  <FaTrashAlt /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedule;
