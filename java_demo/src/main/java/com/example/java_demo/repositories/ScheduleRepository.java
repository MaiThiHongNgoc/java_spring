package com.example.java_demo.repositories;

import com.example.java_demo.entities.Schedule;
import com.example.java_demo.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByStudent(Student student);
}
