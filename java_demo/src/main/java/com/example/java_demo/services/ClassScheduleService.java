package com.example.java_demo.services;

import com.example.java_demo.entities.ClassSchedule;
import com.example.java_demo.repositories.ClassScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassScheduleService implements IClassScheduleService {

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    @Override
    public List<ClassSchedule> getAllSchedules() {
        return classScheduleRepository.findAll();
    }

    @Override
    public Optional<ClassSchedule> getScheduleById(Long id) {
        return classScheduleRepository.findById(id);
    }

    @Override
    public ClassSchedule createSchedule(ClassSchedule classSchedule) {
        return classScheduleRepository.save(classSchedule);
    }

    @Override
    public ClassSchedule updateSchedule(Long id, ClassSchedule classSchedule) {
        return classScheduleRepository.findById(id)
                .map(existingSchedule -> {
                    existingSchedule.setClassEntity(classSchedule.getClassEntity());
                    existingSchedule.setFixedStartTime(classSchedule.getFixedStartTime());
                    existingSchedule.setLessonsPerWeek(classSchedule.getLessonsPerWeek());
                    existingSchedule.setRegistrationStart(classSchedule.getRegistrationStart());
                    existingSchedule.setRegistrationEnd(classSchedule.getRegistrationEnd());
                    existingSchedule.setCourseStart(classSchedule.getCourseStart());
                    existingSchedule.setCourseEnd(classSchedule.getCourseEnd());
                    existingSchedule.setStatus(classSchedule.getStatus());
                    return classScheduleRepository.save(existingSchedule);
                })
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

    @Override
    public void deleteSchedule(Long id) {
        classScheduleRepository.deleteById(id);
    }
    @Override
    public List<ClassSchedule> getSchedulesByStatus(ClassSchedule.ClassStatus status) {
        return classScheduleRepository.findByStatus(status);
    }

}
