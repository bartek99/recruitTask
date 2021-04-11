package pl.bartoszliszka.recruitTask.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateStudentRequest(
        @JsonProperty(value = "firstName", required = true) String firstName,
        @JsonProperty(value = "lastName", required = true) String lastName,
        @JsonProperty(value = "age", required = true) int age,
        @JsonProperty(value = "email", required = true) String email,
        @JsonProperty(value = "subject", required = true) String subject
) {
}
