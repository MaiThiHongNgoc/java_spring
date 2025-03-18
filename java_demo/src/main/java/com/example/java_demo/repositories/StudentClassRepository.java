package com.example.java_demo.repositories;

import com.example.java_demo.entities.StudentClass;
import com.example.java_demo.entities.Classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
    // Đếm số lượng sinh viên trong lớp
    int countByClasses(Classes classes);

    // Tìm quan hệ StudentClass theo studentId và classId
    Optional<StudentClass> findByStudentIdAndClasses_Id(Long studentId, Long classId);


    // Lấy danh sách StudentClass theo classId
    List<StudentClass> findByClassesId(Long classId);
}
