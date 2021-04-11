package pl.bartoszliszka.recruitTask.web.error;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RestError(@JsonProperty("message") String message) {
}
