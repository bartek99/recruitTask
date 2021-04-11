package pl.bartoszliszka.recruitTask.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AddTeacherRequest(
        @JsonProperty(value = "firstName", required = true) String firstName,
        @JsonProperty(value = "lastName", required = true) String lastName,
        @JsonProperty(value = "age", required = true) int age,
        @JsonProperty(value = "email", required = true) String email,
        @JsonProperty(value = "course", required = true) String course
) {
}
