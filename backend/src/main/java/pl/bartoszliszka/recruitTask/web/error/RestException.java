package pl.bartoszliszka.recruitTask.web.error;

public final class RestException extends RuntimeException {

    public RestException(String message) {
        super(message);
    }
}
