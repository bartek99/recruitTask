package pl.bartoszliszka.recruitTask.web;

import com.fasterxml.jackson.annotation.JsonProperty;
public record SuccessResponse<T>(@JsonProperty("result") T result) {
}
