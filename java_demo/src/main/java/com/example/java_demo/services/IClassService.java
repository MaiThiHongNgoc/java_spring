package com.example.java_demo.services;


import com.example.java_demo.entities.Classes;
import java.util.List;
import java.util.Optional;

public interface IClassService {
    List<Classes> getAllClasses();
    Optional<Classes> getClassById(Long id);
    Classes addClass(Classes newClass);
    Classes updateClass(Long id, Classes classDetails);
    void deleteClass(Long id);
}