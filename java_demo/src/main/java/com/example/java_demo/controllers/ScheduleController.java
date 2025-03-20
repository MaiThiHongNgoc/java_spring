package com.example.java_demo.controllers;

import com.example.java_demo.entities.Schedule;
import com.example.java_demo.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;
    @GetMapping("/all")
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    // Lấy danh sách lớp học của sinh viên
    @GetMapping("/student/{studentId}")
    public List<Schedule> getStudentSchedules(@PathVariable Long studentId) {
        return scheduleService.getStudentSchedules(studentId);
    }

    // Sinh viên đăng ký lớp học
    @PostMapping("/register")
    public Map<String, Object> registerClass(@RequestParam Long studentId, @RequestParam Long classScheduleId) {
        return scheduleService.registerClass(studentId, classScheduleId);
    }

    // Sinh viên cập nhật lớp học
    @PutMapping("/{scheduleId}/update")
    public Schedule updateSchedule(@PathVariable Long scheduleId, @RequestParam Long newClassScheduleId) {
        return scheduleService.updateSchedule(scheduleId, newClassScheduleId);
    }

    // Sinh viên hủy đăng ký lớp học
    @DeleteMapping("/{scheduleId}")
    public String deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return "Schedule deleted successfully";
    }
}
