package com.example.java_demo.services;

import com.example.java_demo.entities.StudentClass;
import com.example.java_demo.entities.Classes;
import com.example.java_demo.entities.Student;
import com.example.java_demo.repositories.StudentClassRepository;
import com.example.java_demo.repositories.ClassRepository;
import com.example.java_demo.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentClassService implements IStudentClassService {

    @Autowired
    private StudentClassRepository studentClassRepository;

    @Autowired
    private ClassRepository classesRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<StudentClass> getAllStudentClasses() {
        return studentClassRepository.findAll();
    }

    @Override
    public StudentClass getStudentClassById(Long id) {
        return studentClassRepository.findById(id).orElse(null);
    }

    @Override
    public StudentClass addStudentClass(StudentClass studentClass) {
        return studentClassRepository.save(studentClass);
    }

    @Override
    public StudentClass updateStudentClass(Long id, StudentClass studentClass) {
        Optional<StudentClass> existingStudentClass = studentClassRepository.findById(id);
        if (existingStudentClass.isPresent()) {
            StudentClass updated = existingStudentClass.get();
            updated.setStudent(studentClass.getStudent());
            updated.setClasses(studentClass.getClasses()); // Sửa lỗi ở đây
            return studentClassRepository.save(updated);
        }
        return null;
    }

    @Override
    public void deleteStudentClass(Long id) {
        studentClassRepository.deleteById(id);
    }

    @Override
    public boolean addStudentToClass(Long studentId, Long classId) {
        Optional<Classes> classOpt = classesRepository.findById(classId);
        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (classOpt.isPresent() && studentOpt.isPresent()) {
            Classes classes = classOpt.get();
            int currentSize = studentClassRepository.countByClasses(classes);

            if (currentSize < classes.getMaxStudents()) {
                StudentClass studentClass = new StudentClass();
                studentClass.setStudent(studentOpt.get());
                studentClass.setClasses(classes); // Sửa lỗi ở đây
                studentClassRepository.save(studentClass);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean transferStudent(Long studentId, Long oldClassId, Long newClassId) {
        Optional<Classes> newClassOpt = classesRepository.findById(newClassId);
        Optional<StudentClass> studentClassOpt = studentClassRepository.findByStudentIdAndClasses_Id(studentId, oldClassId); // Kiểm tra lại repository

        if (newClassOpt.isPresent() && studentClassOpt.isPresent()) {
            Classes newClass = newClassOpt.get();
            int newClassSize = studentClassRepository.countByClasses(newClass);

            if (newClassSize < newClass.getMaxStudents()) {
                StudentClass studentClass = studentClassOpt.get();
                studentClass.setClasses(newClass); // Sửa lỗi ở đây
                studentClassRepository.save(studentClass);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean removeStudentFromClass(Long studentId, Long classId) {
        Optional<StudentClass> studentClassOpt = studentClassRepository.findByStudentIdAndClasses_Id(studentId, classId); // Kiểm tra lại repository
        if (studentClassOpt.isPresent()) {
            studentClassRepository.delete(studentClassOpt.get());
            return true;
        }
        return false;
    }

    @Override
    public List<StudentClass> getStudentsByClass(Long classId) {
        return studentClassRepository.findByClassesId(classId); // Kiểm tra lại repository
    }
}
