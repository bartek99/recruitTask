package pl.bartoszliszka.recruitTask.web.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import pl.bartoszliszka.recruitTask.data.Teacher;

public record TeacherResponse(
        @JsonProperty("teacherId") int teacherId,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName,
        @JsonProperty("age") int age,
        @JsonProperty("email") String email,
        @JsonProperty("course") String course
) {
    public static TeacherResponse fromTeacher(Teacher teacher){
        return new TeacherResponse(
                teacher.getTeacherId(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getAge(),
                teacher.getEmail(),
                teacher.getCourse()
        );
    }
}
