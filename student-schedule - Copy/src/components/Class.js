import React, { useEffect, useState } from 'react';
import classService from '../services/classService';
import './Class.css';
import { FaEdit, FaTrash } from "react-icons/fa";


function Class() {
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({ name: "", maxStudents: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await classService.getAllClasses();
            setClasses(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách lớp học:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await classService.updateClass(editingId, formData);
            } else {
                await classService.addClass(formData);
            }
            setFormData({ name: "", maxStudents: "" });
            setEditingId(null);
            fetchClasses();
        } catch (error) {
            console.error("Lỗi khi thêm/cập nhật lớp học:", error);
        }
    };

    const handleEdit = (classItem) => {
        setEditingId(classItem.id);
        setFormData({ name: classItem.name, maxStudents: classItem.maxStudents });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa lớp học này?")) {
            try {
                await classService.deleteClass(id);
                fetchClasses();
            } catch (error) {
                console.error("Lỗi khi xóa lớp học:", error);
            }
        }
    };

    return (
        <div className="class-container">
            <h2>Quản Lý Lớp Học</h2>

            {/* Form Thêm/Sửa Lớp */}
            <form className="class-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên lớp"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="maxStudents"
                    placeholder="Số lượng học sinh tối đa"
                    value={formData.maxStudents}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingId ? "Cập Nhật" : "Thêm Mới"}</button>
            </form>

            {/* Ô tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm lớp học..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Danh sách lớp học */}
            <table className="class-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Lớp</th>
                        <th>Số HS Tối Đa</th>
                        <th>Ngày Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {classes
                        .filter((classItem) =>
                            classItem.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((classItem) => (
                            <tr key={classItem.id}>
                                <td>{classItem.id}</td>
                                <td>{classItem.name}</td>
                                <td>{classItem.maxStudents}</td>
                                <td>{new Date(classItem.createdAt).toLocaleString()}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(classItem)}>
                                        <FaEdit /> Sửa
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(classItem.id)}>
                                        <FaTrash /> Xóa
                                    </button>

                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}


export default Class
