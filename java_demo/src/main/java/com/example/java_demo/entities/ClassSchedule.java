package com.example.java_demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "class_schedule")
public class ClassSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Classes classEntity;

    @Column(name = "fixed_start_time", nullable = false)
    private LocalTime fixedStartTime;  // Giờ bắt đầu cố định

    @Column(name = "duration_minutes", nullable = false, columnDefinition = "INT DEFAULT 60")
    private Integer durationMinutes = 60; // Thời gian cố định 60 phút

    @Column(name = "lessons_per_week", nullable = false)
    private Integer lessonsPerWeek; // Số tiết học mỗi tuần

    @Column(name = "registration_start", nullable = false)
    private LocalDate registrationStart; // Ngày bắt đầu đăng ký lớp

    @Column(name = "registration_end", nullable = false)
    private LocalDate registrationEnd; // Ngày kết thúc đăng ký lớp

    @Column(name = "course_start", nullable = false)
    private LocalDate courseStart; // Ngày bắt đầu học môn

    @Column(name = "course_end", nullable = false)
    private LocalDate courseEnd; // Ngày kết thúc môn

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ClassStatus status = ClassStatus.ACTIVE; // Trạng thái lớp học

    public enum ClassStatus {
        ACTIVE, COMPLETED, CANCELED
    }

    // Constructors, Getters và Setters
    public ClassSchedule() {
    }

    public ClassSchedule(Classes classEntity, LocalTime fixedStartTime, Integer lessonsPerWeek,
                         LocalDate registrationStart, LocalDate registrationEnd,
                         LocalDate courseStart, LocalDate courseEnd, ClassStatus status) {
        this.classEntity = classEntity;
        this.fixedStartTime = fixedStartTime;
        this.lessonsPerWeek = lessonsPerWeek;
        this.registrationStart = registrationStart;
        this.registrationEnd = registrationEnd;
        this.courseStart = courseStart;
        this.courseEnd = courseEnd;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Classes getClassEntity() {
        return classEntity;
    }

    public void setClassEntity(Classes classEntity) {
        this.classEntity = classEntity;
    }

    public LocalTime getFixedStartTime() {
        return fixedStartTime;
    }

    public void setFixedStartTime(LocalTime fixedStartTime) {
        this.fixedStartTime = fixedStartTime;
    }

    public Integer getLessonsPerWeek() {
        return lessonsPerWeek;
    }

    public void setLessonsPerWeek(Integer lessonsPerWeek) {
        this.lessonsPerWeek = lessonsPerWeek;
    }

    public LocalDate getRegistrationStart() {
        return registrationStart;
    }

    public void setRegistrationStart(LocalDate registrationStart) {
        this.registrationStart = registrationStart;
    }

    public LocalDate getRegistrationEnd() {
        return registrationEnd;
    }

    public void setRegistrationEnd(LocalDate registrationEnd) {
        this.registrationEnd = registrationEnd;
    }

    public LocalDate getCourseStart() {
        return courseStart;
    }

    public void setCourseStart(LocalDate courseStart) {
        this.courseStart = courseStart;
    }

    public LocalDate getCourseEnd() {
        return courseEnd;
    }

    public void setCourseEnd(LocalDate courseEnd) {
        this.courseEnd = courseEnd;
    }

    public ClassStatus getStatus() {
        return status;
    }

    public void setStatus(ClassStatus status) {
        this.status = status;
    }
}
