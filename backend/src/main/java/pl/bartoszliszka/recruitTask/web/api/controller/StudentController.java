package pl.bartoszliszka.recruitTask.web.api.controller;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.bartoszliszka.recruitTask.data.Student;
import pl.bartoszliszka.recruitTask.data.StudentRepository;
import pl.bartoszliszka.recruitTask.data.TeacherRepository;
import pl.bartoszliszka.recruitTask.request.AddStudentRequest;
import pl.bartoszliszka.recruitTask.request.AddStudentTeacherRequest;
import pl.bartoszliszka.recruitTask.request.UpdateStudentRequest;
import pl.bartoszliszka.recruitTask.web.SuccessResponse;
import pl.bartoszliszka.recruitTask.web.api.response.StudentResponse;
import pl.bartoszliszka.recruitTask.web.api.response.TeacherResponse;
import pl.bartoszliszka.recruitTask.web.error.RestException;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository, TeacherRepository teacherRepository){
        this.studentRepository=studentRepository;
        this.teacherRepository=teacherRepository;
    }

    @CrossOrigin
    @PostMapping
    public SuccessResponse<StudentResponse> addStudent(@RequestBody AddStudentRequest request){
        return studentRepository.addStudent(request.firstName(), request.lastName(),request.age(),request.email(),request.subject())
                .map(StudentResponse::fromStudent)
                .map(SuccessResponse::new)
                .orElseThrow(() -> new RestException("Unable to add a student."));
    }
    @CrossOrigin
    @GetMapping("/searchStudent")
    public SuccessResponse<List<StudentResponse>> searchStudentsByEmail(
            @RequestParam(value = "email", required = true) String email,
            @RequestParam(value = "notStudentId", required = false) Integer notStudentId
    ) {
        if (email != null) {
            var students = studentRepository.getStudentsByEmail(email).map(List::of).orElse(List.of());
            if(notStudentId!=null){
                students=students
                        .stream()
                        .filter(student -> student.getStudentId()!=notStudentId)
                        .collect(Collectors.toList());
            }
            return new SuccessResponse<>(students.stream().map(StudentResponse::fromStudent).collect(Collectors.toList()));
        }
        else {
            return new SuccessResponse<>(List.of());
        }

    }



    @CrossOrigin
    @GetMapping("/searchTeacher")
    public SuccessResponse<List<TeacherResponse>> searchTeachersByEmail(
            @RequestParam(value = "email", required = true) String email) {
        if (email != null) {
            var teachers = studentRepository.getTeachersByEmail(email).map(List::of).orElse(List.of());
            return new SuccessResponse<>(teachers.stream().map(TeacherResponse::fromTeacher).collect(Collectors.toList()));
        } else {
            return new SuccessResponse<>(List.of());
        }
    }


    @CrossOrigin
    @PostMapping("/addStudentToTeacher")
    public SuccessResponse<Void> addTeacher(
            @RequestBody AddStudentTeacherRequest request) {
        final var student=studentRepository.getStudentById(request.studentId());
        final var teacher = teacherRepository.getTeacherById(request.teacherId());
        if (student.isEmpty() || teacher.isEmpty()) {
            throw new RestException("Unable to add a teacher to student.");
        } else {
            final var added = studentRepository.addStudent(student.get(), teacher.get());
            if (added) {
                return new SuccessResponse<>(null);
            } else {
                throw new RestException("Unable to add a teacher to student.");
            }
        }
    }

    @CrossOrigin
    @GetMapping
    public SuccessResponse<List<StudentResponse>> getStudents() {
        final var students = studentRepository
                .getStudents()
                .stream()
                .map(StudentResponse::fromStudent)
                .collect(Collectors.toList());
        return new SuccessResponse<>(students);
    }

    @CrossOrigin
    @GetMapping("/page/{pageNumber}/sort/{sort}")
    public SuccessResponse<List<StudentResponse>> getStudentsByPage(
            @PathVariable("pageNumber") int pageNumber,
            @PathVariable("sort") String sort
    ) {
        List<Student> students;
        if(!sort.equals("Not sorted")) {
            students = studentRepository.getSortedStudent(sort);
        }else{
            students=studentRepository.getStudents();
        }
        int indexFrom=(pageNumber-1)*10;
        int indexTo=indexFrom+10;
        if(indexTo>students.size()){
            students=students.subList(indexFrom,students.size());
        }else {
            students=students.subList(indexFrom,indexTo);
        }
        final var studentsByPage=students
                .stream()
                .map(StudentResponse::fromStudent)
                .collect(Collectors.toList());
        return new SuccessResponse<>(studentsByPage);
    }

    @CrossOrigin
    @DeleteMapping("/{studentId}")
    public SuccessResponse<Void> deleteStudent(@PathVariable("studentId") int studentId) {
        return studentRepository
                .deleteStudentById(studentId)
                .map(deleted -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException(("Unable to delete a student")));
    }

    @CrossOrigin
    @GetMapping("/studentId/{studentId}")
    public SuccessResponse<StudentResponse> getStudentById(@PathVariable("studentId") int studentId) {
        return studentRepository
                .getStudentById(studentId)
                .map(StudentResponse::fromStudent)
                .map(SuccessResponse::new)
                .orElseThrow(() -> new RestException("Unable to get a student."));
    }


    @CrossOrigin
    @PutMapping("/updateStudent/{studentId}")
    public SuccessResponse<Void> updateStudent(
            @PathVariable("studentId") int studentId,
            @RequestBody UpdateStudentRequest request) {
        return studentRepository
                .updateStudentById(studentId, request.firstName(), request.lastName(), request.age(), request.email(), request.subject())
                .map(updated -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException("Unable to update an student."));
    }

    @CrossOrigin
    @GetMapping("/searchStudent/{nameStudent}")
    public SuccessResponse<List<StudentResponse>> searchStudents(
            @PathVariable("nameStudent") String nameStudent) {
        final var students = studentRepository
                .getStudentsByName(nameStudent)
                .stream()
                .map(StudentResponse::fromStudent)
                .collect(Collectors.toList());
        return new SuccessResponse<>(students);
    }

    @CrossOrigin
    @GetMapping("/teacherId/{teacherId}")
    public SuccessResponse<List<StudentResponse>> getStudentsByTeacherId(
            @PathVariable("teacherId") int teacherId
    ) {
        final var students=studentRepository
                .getStudentsByTeacherId(teacherId)
                .stream()
                .map(StudentResponse::fromStudent)
                .collect(Collectors.toList());
        return new SuccessResponse<>(students);
    }


    @CrossOrigin
    @DeleteMapping("/deleteTeacher/{teacherId}/Student/{studentId}/Connection")
    public SuccessResponse<Void> deleteStudentTeacherConnection(
            @PathVariable("teacherId") int teacherId,
            @PathVariable("studentId") int studentId){
        return studentRepository
                .deleteStudentTeacherConnection(teacherId,studentId)
                .map(deleted -> new SuccessResponse<Void>(null))
                .orElseThrow(() -> new RestException(("Unable to delete a connection student with teacher")));
    }
}
