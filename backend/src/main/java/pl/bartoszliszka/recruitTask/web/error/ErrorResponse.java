package pl.bartoszliszka.recruitTask.web.error;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ErrorResponse(@JsonProperty("error")pl.bartoszliszka.recruitTask.web.error.RestError error) {
}
