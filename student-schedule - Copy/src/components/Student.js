import React, { useEffect, useState } from 'react';
import StudentService from '../services/StudentService';
import { FaEdit, FaTrash } from "react-icons/fa";
import './Student.css';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: "", email: "", phone: "" });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await StudentService.getAll();
            setStudents(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách sinh viên:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await StudentService.update(formData.id, formData);
            } else {
                await StudentService.add(formData);
            }
            setFormData({ id: null, name: "", email: "", phone: "" });
            loadStudents();
        } catch (error) {
            console.error("Lỗi khi lưu sinh viên:", error);
        }
    };

    const handleEdit = (student) => {
        setFormData(student);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
            try {
                await StudentService.remove(id);
                loadStudents();
            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error);
            }
        }
    };

    return (
        <div className="student-container">
            <h2>Quản lý Sinh viên</h2>

            <form className="student-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{formData.id ? "Cập nhật" : "Thêm"}</button>
            </form>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button className="student-edit-btn" onClick={() => handleEdit(student)}>
                                    <FaEdit /> Sửa
                                </button>
                                <button className="student-delete-btn" onClick={() => handleDelete(student.id)}>
                                    <FaTrash /> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Student;
