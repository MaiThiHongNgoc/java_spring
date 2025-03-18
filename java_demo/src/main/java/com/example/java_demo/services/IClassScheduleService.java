package com.example.java_demo.services;

import com.example.java_demo.entities.ClassSchedule;

import java.util.List;
import java.util.Optional;

public interface IClassScheduleService {
    List<ClassSchedule> getAllSchedules();
    Optional<ClassSchedule> getScheduleById(Long id);
    ClassSchedule createSchedule(ClassSchedule classSchedule);
    ClassSchedule updateSchedule(Long id, ClassSchedule classSchedule);
    void deleteSchedule(Long id);
    List<ClassSchedule> getSchedulesByStatus(ClassSchedule.ClassStatus status);

}
