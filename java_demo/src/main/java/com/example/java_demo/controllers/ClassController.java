package com.example.java_demo.controllers;

import com.example.java_demo.entities.Classes;
import com.example.java_demo.services.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/classes")
public class ClassController {

    private final IClassService classService;

    @Autowired
    public ClassController(IClassService classService) {
        this.classService = classService;
    }

    // Lấy danh sách tất cả lớp học
    @GetMapping
    public List<Classes> getAllClasses() {
        return classService.getAllClasses();
    }

    // Lấy thông tin lớp học theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Classes> getClassById(@PathVariable Long id) {
        Optional<Classes> classData = classService.getClassById(id);
        return classData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Thêm lớp học mới
    @PostMapping
    public ResponseEntity<Classes> addClass(@RequestBody Classes newClass) {
        Classes createdClass = classService.addClass(newClass);
        return ResponseEntity.ok(createdClass);
    }

    // Cập nhật thông tin lớp học
    @PutMapping("/{id}")
    public ResponseEntity<Classes> updateClass(@PathVariable Long id, @RequestBody Classes classDetails) {
        try {
            Classes updatedClass = classService.updateClass(id, classDetails);
            return ResponseEntity.ok(updatedClass);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa lớp học theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }
}
