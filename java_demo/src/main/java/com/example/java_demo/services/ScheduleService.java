package com.example.java_demo.services;

import com.example.java_demo.entities.ClassSchedule;
import com.example.java_demo.entities.Schedule;
import com.example.java_demo.entities.Student;
import com.example.java_demo.repositories.ClassScheduleRepository;
import com.example.java_demo.repositories.ScheduleRepository;
import com.example.java_demo.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    // Lấy danh sách lớp đã đăng ký của sinh viên
    public List<Schedule> getStudentSchedules(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return scheduleRepository.findByStudent(student);
    }

    // Sinh viên đăng ký lớp học
    public Map<String, Object> registerClass(Long studentId, Long classScheduleId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        ClassSchedule classSchedule = classScheduleRepository.findById(classScheduleId)
                .orElseThrow(() -> new RuntimeException("Class Schedule not found"));

        // Lấy danh sách lớp đã đăng ký của học sinh
        List<Schedule> registeredSchedules = scheduleRepository.findByStudent(student);

        // Kiểm tra xem sinh viên đã đăng ký lớp này chưa
        if (registeredSchedules.stream()
                .anyMatch(schedule -> schedule.getClassSchedule().getId().equals(classScheduleId))) {
            throw new RuntimeException("Student is already registered for this class.");
        }

        // Kiểm tra thời gian đăng ký có hợp lệ không
        LocalDate today = LocalDate.now();
        if (today.isBefore(classSchedule.getRegistrationStart()) || today.isAfter(classSchedule.getRegistrationEnd())) {
            throw new RuntimeException("Registration period is over.");
        }

        // Tạo mới lịch học
        Schedule schedule = new Schedule();
        schedule.setStudent(student);
        schedule.setClassSchedule(classSchedule);
        schedule.setCanEdit(true);
        Schedule savedSchedule = scheduleRepository.save(schedule);

        // Trả về danh sách lớp đã đăng ký cùng với lịch mới
        Map<String, Object> response = new HashMap<>();
        response.put("registeredClasses", registeredSchedules);
        response.put("newSchedule", savedSchedule);

        return response;
    }

    // Sinh viên thay đổi lớp nếu vẫn còn thời gian chỉnh sửa
    public Schedule updateSchedule(Long scheduleId, Long newClassScheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        if (!schedule.isCanEdit()) {
            throw new RuntimeException("Schedule can no longer be edited.");
        }

        ClassSchedule newClassSchedule = classScheduleRepository.findById(newClassScheduleId)
                .orElseThrow(() -> new RuntimeException("New Class Schedule not found"));

        // Kiểm tra thời gian đăng ký
        LocalDate today = LocalDate.now();
        if (today.isBefore(newClassSchedule.getRegistrationStart()) || today.isAfter(newClassSchedule.getRegistrationEnd())) {
            throw new RuntimeException("New registration period is over.");
        }

        schedule.setClassSchedule(newClassSchedule);
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAllSchedules();
    }
    // Sinh viên hủy đăng ký lớp nếu còn thời gian chỉnh sửa
    public void deleteSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        if (!schedule.isCanEdit()) {
            throw new RuntimeException("Schedule can no longer be deleted.");
        }

        scheduleRepository.delete(schedule);
    }

}
