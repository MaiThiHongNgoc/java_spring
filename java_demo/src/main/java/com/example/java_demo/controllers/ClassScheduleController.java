package com.example.java_demo.controllers;

import com.example.java_demo.entities.ClassSchedule;
import com.example.java_demo.services.IClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/class-schedules")
public class ClassScheduleController {

    @Autowired
    private IClassScheduleService classScheduleService;

    @GetMapping
    public List<ClassSchedule> getAllSchedules() {
        return classScheduleService.getAllSchedules();
    }

    @GetMapping("/{id}")
    public Optional<ClassSchedule> getScheduleById(@PathVariable Long id) {
        return classScheduleService.getScheduleById(id);
    }

    @PostMapping
    public ClassSchedule createSchedule(@RequestBody ClassSchedule classSchedule) {
        return classScheduleService.createSchedule(classSchedule);
    }

    @PutMapping("/{id}")
    public ClassSchedule updateSchedule(@PathVariable Long id, @RequestBody ClassSchedule classSchedule) {
        return classScheduleService.updateSchedule(id, classSchedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        classScheduleService.deleteSchedule(id);
    }
    @GetMapping("/status/{status}")
    public List<ClassSchedule> getSchedulesByStatus(@PathVariable String status) {
        try {
            ClassSchedule.ClassStatus classStatus = ClassSchedule.ClassStatus.valueOf(status.toUpperCase());
            return classScheduleService.getSchedulesByStatus(classStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value. Allowed values: ACTIVE, COMPLETED, CANCELED.");
        }
    }

}
