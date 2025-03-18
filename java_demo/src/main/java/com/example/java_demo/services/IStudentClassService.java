package com.example.java_demo.services;

import com.example.java_demo.entities.StudentClass;
import java.util.List;

public interface IStudentClassService {
    List<StudentClass> getAllStudentClasses();
    StudentClass getStudentClassById(Long id);
    StudentClass addStudentClass(StudentClass studentClass);
    StudentClass updateStudentClass(Long id, StudentClass studentClass);
    void deleteStudentClass(Long id);

    // Thêm sinh viên vào lớp
    boolean addStudentToClass(Long studentId, Long classId);

    // Điều chuyển sinh viên sang lớp khác
    boolean transferStudent(Long studentId, Long oldClassId, Long newClassId);

    // Xóa sinh viên khỏi lớp
    boolean removeStudentFromClass(Long studentId, Long classId);

    // Lấy danh sách sinh viên theo lớp
    List<StudentClass> getStudentsByClass(Long classId);
}
