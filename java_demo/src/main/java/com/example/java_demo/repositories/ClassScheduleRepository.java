package com.example.java_demo.repositories;

import com.example.java_demo.entities.ClassSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
    List<ClassSchedule> findByStatus(ClassSchedule.ClassStatus status);
}
