package pl.bartoszliszka.recruitTask.data;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.DoubleStream;

public interface TeacherRepository {
    Optional<Teacher> addTeacher(
            String firstName,
            String lastName,
            int age,
            String email,
            String course
    );

    Optional<Student> getStudentsByEmail(String email);
    Optional<Teacher> getTeachersByEmail(String email);
    Optional<Teacher> getTeacherById(int teacherId);

    List<Teacher> getTeachers();
    List<Teacher> getSortedTeacher(String sort);
    Optional<Boolean> deleteTeacherById(int teacherId);

    Optional<Boolean> updateTeacherById(int teacherId, String firstName, String lastName, int age, String email, String course);

    List<Teacher> getTeachersByName(String nameTeacher);

    List<Teacher> getTeachersByStudentId(int studentId);

    Optional<Boolean> deleteStudentTeacherConnection(int studentId, int teacherId);
}
