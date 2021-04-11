package pl.bartoszliszka.recruitTask.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AddStudentTeacherRequest(
        @JsonProperty(value = "studentId", required = true) int studentId,
        @JsonProperty(value = "teacherId", required = true) int teacherId
) {
}
