package pl.bartoszliszka.recruitTask.web.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import pl.bartoszliszka.recruitTask.data.Student;

public record StudentResponse(
        @JsonProperty("studentId") int studentId,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName,
        @JsonProperty("age") int age,
        @JsonProperty("email") String email,
        @JsonProperty("subject") String subject
) {
    public static StudentResponse fromStudent(Student student){
        return new StudentResponse(
                student.getStudentId(),
                student.getFirstName(),
                student.getLastName(),
                student.getAge(),
                student.getEmail(),
                student.getSubject()
        );
    }
}
