package com.example.java_demo.services;

import com.example.java_demo.entities.Classes;
import com.example.java_demo.repositories.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService {

    private final ClassRepository classRepository;

    @Autowired
    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }


    @Override
    public List<Classes> getAllClasses() {
        return classRepository.findAll();
    }

    @Override
    public Optional<Classes> getClassById(Long id) {
        return classRepository.findById(id);
    }
    @Override
    public Classes addClass(Classes newClass) {
        return classRepository.save(newClass);
    }


    @Override
    public Classes updateClass(Long id, Classes classDetails) {
        return classRepository.findById(id).map(classEntity -> {
            classEntity.setName(classDetails.getName());
            classEntity.setMaxStudents(classDetails.getMaxStudents());
            return classRepository.save(classEntity);
        }).orElseThrow(() -> new RuntimeException("Class not found"));
    }

    @Override
    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}
