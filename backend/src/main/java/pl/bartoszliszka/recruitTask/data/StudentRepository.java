package pl.bartoszliszka.recruitTask.data;

import java.util.*;
import java.util.stream.DoubleStream;

public interface StudentRepository {

    Optional<Student> addStudent(
            String firstName,
            String lastName,
            int age,
            String email,
            String subject
    );

    Optional<Student> getStudentsByEmail(String email);
    Optional<Teacher> getTeachersByEmail(String email);

    Optional<Student> getStudentById(int studentId);

    public boolean addStudent(Student student, Teacher teacher);

    List<Student> getStudents();

    List<Student> getStudentsByPage(int pageNumber);

    Optional<Boolean> deleteStudentById(int studentId);

    List<Student> getSortedStudent(String sort);

    Optional<Boolean> updateStudentById(int studentId, String firstName, String lastName, int age, String email, String subject);

    List<Student> getStudentsByName(String nameStudent);

    List<Student> getStudentsByTeacherId(int teacherId);

    Optional<Boolean> deleteStudentTeacherConnection(int teacherId, int studentId);
}
