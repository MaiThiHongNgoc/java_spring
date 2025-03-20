package com.example.java_demo.repositories;

import com.example.java_demo.entities.Schedule;
import com.example.java_demo.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // Lấy tất cả lịch học, bao gồm thông tin sinh viên, lịch học và lớp học
    @Query("SELECT s FROM Schedule s " +
            "JOIN FETCH s.student st " +
            "JOIN FETCH s.classSchedule cs " +
            "JOIN FETCH cs.classEntity c")
    List<Schedule> findAllSchedules();

    // Lấy danh sách lịch học của một sinh viên cụ thể
    List<Schedule> findByStudent(Student student);
}
