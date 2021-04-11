package pl.bartoszliszka.recruitTask.web.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.bartoszliszka.recruitTask.data.Student;
import pl.bartoszliszka.recruitTask.data.StudentRepository;
import pl.bartoszliszka.recruitTask.data.Teacher;
import pl.bartoszliszka.recruitTask.data.TeacherRepository;
import pl.bartoszliszka.recruitTask.request.AddStudentRequest;
import pl.bartoszliszka.recruitTask.request.AddTeacherRequest;
import pl.bartoszliszka.recruitTask.request.UpdateStudentRequest;
import pl.bartoszliszka.recruitTask.request.UpdateTeacherRequest;
import pl.bartoszliszka.recruitTask.web.SuccessResponse;
import pl.bartoszliszka.recruitTask.web.api.response.StudentResponse;
import pl.bartoszliszka.recruitTask.web.api.response.TeacherResponse;
import pl.bartoszliszka.recruitTask.web.error.RestException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public TeacherController(TeacherRepository teacherRepository, StudentRepository studentRepository){
        this.teacherRepository=teacherRepository;
        this.studentRepository=studentRepository;
    }


    @CrossOrigin
    @PostMapping
    public SuccessResponse<TeacherResponse> addTeacher(@RequestBody AddTeacherRequest request){
        return teacherRepository.addTeacher(request.firstName(), request.lastName(),request.age(),request.email(),request.course())
                .map(TeacherResponse::fromTeacher)
                .map(SuccessResponse::new)
                .orElseThrow(() -> new RestException("Unable to add a teacher."));
    }
    @CrossOrigin
    @GetMapping("/searchStudent")
    public SuccessResponse<List<StudentResponse>> searchStudentsByEmail(
            @RequestParam(value = "email", required = true) String email) {
        if (email != null) {
            var students = teacherRepository.getStudentsByEmail(email).map(List::of).orElse(List.of());
            return new SuccessResponse<>(students.stream().map(StudentResponse::fromStudent).collect(Collectors.toList()));
        }
        else {
            return new SuccessResponse<>(List.of());
        }

    }



    @CrossOrigin
    @GetMapping("/searchTeacher")
    public SuccessResponse<List<TeacherResponse>> searchTeachersByEmail(
            @RequestParam(value = "email", required = true) String email,
            @RequestParam(value = "notTeacherId", required = false) Integer notTeacherId) {
        if (email != null) {
            var teachers = teacherRepository.getTeachersByEmail(email).map(List::of).orElse(List.of());
            if(notTeacherId!=null){
                teachers=teachers
                        .stream()
                        .filter(teacher -> teacher.getTeacherId()!=notTeacherId)
                        .collect(Collectors.toList());
            }
            return new SuccessResponse<>(teachers.stream().map(TeacherResponse::fromTeacher).collect(Collectors.toList()));
        } else {
            return new SuccessResponse<>(List.of());
        }
    }

    @CrossOrigin
    @GetMapping
    public SuccessResponse<List<TeacherResponse>> getTeachers() {
        final var teachers = teacherRepository
                .getTeachers()
                .stream()
                .map(TeacherResponse::fromTeacher)
                .collect(Collectors.toList());
        return new SuccessResponse<>(teachers);
    }

    @CrossOrigin
    @DeleteMapping("/{teacherId}")
    public SuccessResponse<Void> deleteTeacher(@PathVariable("teacherId") int teacherId) {
        return teacherRepository
                .deleteTeacherById(teacherId)
                .map(deleted -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException(("Unable to delete a teacher")));
    }

    @CrossOrigin
    @GetMapping("/teacherId/{teacherId}")
    public SuccessResponse<TeacherResponse> getTeacherById(@PathVariable("teacherId") int teacherId) {
        return teacherRepository
                .getTeacherById(teacherId)
                .map(TeacherResponse::fromTeacher)
                .map(SuccessResponse::new)
                .orElseThrow(() -> new RestException("Unable to get a teacher."));
    }

    @CrossOrigin
    @PutMapping("/updateTeacher/{teacherId}")
    public SuccessResponse<Void> updateTeacher(
            @PathVariable("teacherId") int teacherId,
            @RequestBody UpdateTeacherRequest request) {
        return teacherRepository
                .updateTeacherById(teacherId, request.firstName(), request.lastName(), request.age(), request.email(), request.course())
                .map(updated -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException("Unable to update an student."));
    }

    @CrossOrigin
    @GetMapping("/searchTeacher/{nameTeacher}")
    public SuccessResponse<List<TeacherResponse>> searchTeachers(
            @PathVariable("nameTeacher") String nameTeacher) {
        final var teachers = teacherRepository
                .getTeachersByName(nameTeacher)
                .stream()
                .map(TeacherResponse::fromTeacher)
                .collect(Collectors.toList());
        return new SuccessResponse<>(teachers);
    }

    @CrossOrigin
    @GetMapping("/studentId/{studentId}")
    public SuccessResponse<List<TeacherResponse>> getTeachersByStudentId(
            @PathVariable("studentId") int studentId
    ) {
        final var teachers=teacherRepository
                .getTeachersByStudentId(studentId)
            .stream()
            .map(TeacherResponse::fromTeacher)
            .collect(Collectors.toList());
        return new SuccessResponse<>(teachers);
    }

    @CrossOrigin
    @GetMapping("/page/{pageNumber}/sort/{sort}")
    public SuccessResponse<List<TeacherResponse>> getTeachersByPage(
            @PathVariable("pageNumber") int pageNumber,
            @PathVariable("sort") String sort
    ) {
        List<Teacher> teachers;
        if(!sort.equals("Not sorted")) {
            teachers = teacherRepository.getSortedTeacher(sort);
        }else{
            teachers=teacherRepository.getTeachers();
        }
        int indexFrom=(pageNumber-1)*10;
        int indexTo=indexFrom+10;
        if(indexTo>teachers.size()){
            teachers=teachers.subList(indexFrom,teachers.size());
        }else {
            teachers=teachers.subList(indexFrom,indexTo);
        }
        final var teachersByPage=teachers
                .stream()
                .map(TeacherResponse::fromTeacher)
                .collect(Collectors.toList());
        return new SuccessResponse<>(teachersByPage);
    }


    @CrossOrigin
    @DeleteMapping("/deleteStudent/{studentId}/Teacher/{teacherId}/Connection")
    public SuccessResponse<Void> deleteStudentTeacherConnection(
            @PathVariable("studentId") int studentId,
            @PathVariable("teacherId") int teacherId){
        return teacherRepository
                .deleteStudentTeacherConnection(studentId,teacherId)
                .map(deleted -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException(("Unable to delete a connection student with teacher")));
    }


}
