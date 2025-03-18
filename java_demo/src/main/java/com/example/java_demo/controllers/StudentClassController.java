package com.example.java_demo.controllers;

import com.example.java_demo.entities.StudentClass;
import com.example.java_demo.services.IStudentClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/student-classes")
public class StudentClassController {

    @Autowired
    private IStudentClassService studentClassService;

    // Lấy danh sách tất cả StudentClass
    @GetMapping
    public List<StudentClass> getAllStudentClasses() {
        return studentClassService.getAllStudentClasses();
    }

    // Lấy thông tin StudentClass theo ID
    @GetMapping("/{id}")
    public StudentClass getStudentClassById(@PathVariable Long id) {
        return studentClassService.getStudentClassById(id);
    }

    // Thêm một StudentClass mới
    @PostMapping
    public StudentClass addStudentClass(@RequestBody StudentClass studentClass) {
        return studentClassService.addStudentClass(studentClass);
    }

    // Cập nhật StudentClass theo ID
    @PutMapping("/{id}")
    public StudentClass updateStudentClass(@PathVariable Long id, @RequestBody StudentClass studentClass) {
        return studentClassService.updateStudentClass(id, studentClass);
    }

    // Xóa StudentClass theo ID
    @DeleteMapping("/{id}")
    public void deleteStudentClass(@PathVariable Long id) {
        studentClassService.deleteStudentClass(id);
    }

    // Thêm sinh viên vào lớp
    @PostMapping("/add-student")
    public boolean addStudentToClass(@RequestParam Long studentId, @RequestParam Long classId) {
        return studentClassService.addStudentToClass(studentId, classId);
    }

    // Điều chuyển sinh viên sang lớp khác
    @PutMapping("/transfer-student")
    public boolean transferStudent(@RequestParam Long studentId, @RequestParam Long oldClassId, @RequestParam Long newClassId) {
        return studentClassService.transferStudent(studentId, oldClassId, newClassId);
    }

    // Xóa sinh viên khỏi lớp
    @DeleteMapping("/remove-student")
    public boolean removeStudentFromClass(@RequestParam Long studentId, @RequestParam Long classId) {
        return studentClassService.removeStudentFromClass(studentId, classId);
    }

    // Lấy danh sách sinh viên theo lớp
    @GetMapping("/by-class/{classId}")
    public List<StudentClass> getStudentsByClass(@PathVariable Long classId) {
        return studentClassService.getStudentsByClass(classId);
    }
}
