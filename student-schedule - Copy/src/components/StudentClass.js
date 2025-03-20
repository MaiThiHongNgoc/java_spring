import React, { useEffect, useState } from "react";
import StudentClassService from "../services/StudentClassService";
import { FaEdit, FaTrash, FaExchangeAlt, FaUserPlus, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentClass.css";

//toast.configure();

const StudentClass = () => {
  const [studentClasses, setStudentClasses] = useState([]);
  const [formData, setFormData] = useState({ studentId: "", classId: "" });
  const [transferData, setTransferData] = useState({ studentId: "", oldClassId: "", newClassId: "" });
  const [filterClassId, setFilterClassId] = useState("");

  useEffect(() => {
    loadStudentClasses();
  }, []);

  const loadStudentClasses = async () => {
    try {
      const response = await StudentClassService.getAll();
      setStudentClasses(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
      toast.error("Lỗi khi tải danh sách lớp học!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StudentClassService.addStudentToClass(formData.studentId, formData.classId);
      setFormData({ studentId: "", classId: "" });
      loadStudentClasses();
      toast.success("Thêm sinh viên vào lớp thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên vào lớp:", error);
      toast.error(error.response?.data?.message || "Lớp học đã đầy hoặc có lỗi xảy ra!");
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await StudentClassService.transferStudent(transferData.studentId, transferData.oldClassId, transferData.newClassId);
      setTransferData({ studentId: "", oldClassId: "", newClassId: "" });
      loadStudentClasses();
      toast.success("Chuyển lớp thành công!");
    } catch (error) {
      console.error("Lỗi khi chuyển lớp:", error);
      toast.error(error.response?.data?.message || "Chuyển lớp thất bại!");
    }
  };

  const handleDelete = async (studentId, classId) => {
    if (window.confirm("Bạn có chắc muốn xóa sinh viên khỏi lớp này?")) {
      try {
        await StudentClassService.removeStudentFromClass(studentId, classId);
        loadStudentClasses();
        toast.success("Xóa sinh viên khỏi lớp thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Không thể xóa sinh viên khỏi lớp!");
      }
    }
  };

  return (
    <div className="student-class-container">
      <h2>Quản lý Sinh viên - Lớp</h2>
      
      <form onSubmit={handleSubmit} className="student-class-form">
        <h3>Thêm Sinh Viên vào Lớp</h3>
        <input type="number" name="studentId" placeholder="Mã sinh viên" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} required />
        <input type="number" name="classId" placeholder="Mã lớp" value={formData.classId} onChange={(e) => setFormData({ ...formData, classId: e.target.value })} required />
        <button type="submit" className="student-class-button">
          <FaUserPlus /> Thêm
        </button>
      </form>
      
      <form onSubmit={handleTransfer} className="student-transfer-form">
        <h3>Chuyển Lớp</h3>
        <input type="number" name="studentId" placeholder="Mã sinh viên" value={transferData.studentId} onChange={(e) => setTransferData({ ...transferData, studentId: e.target.value })} required />
        <input type="number" name="oldClassId" placeholder="Mã lớp cũ" value={transferData.oldClassId} onChange={(e) => setTransferData({ ...transferData, oldClassId: e.target.value })} required />
        <input type="number" name="newClassId" placeholder="Mã lớp mới" value={transferData.newClassId} onChange={(e) => setTransferData({ ...transferData, newClassId: e.target.value })} required />
        <button type="submit" className="student-transfer-button">
          <FaExchangeAlt /> Chuyển Lớp
        </button>
      </form>
      
      <table className="student-class-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã SV</th>
            <th>Tên Sinh Viên</th>
            <th>Mã Lớp</th>
            <th>Tên Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {studentClasses.map((sc) => (
            <tr key={sc.id}>
              <td>{sc.id}</td>
              <td>{sc.student.id}</td>
              <td>{sc.student.name}</td>
              <td>{sc.classes.id}</td>
              <td>{sc.classes.name}</td>
              <td>
                <button onClick={() => handleDelete(sc.student.id, sc.classes.id)} className="student-delete-button">
                  <FaTrash /> Xóa khỏi lớp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentClass;
