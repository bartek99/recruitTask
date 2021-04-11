package pl.bartoszliszka.recruitTask.data;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    int studentId;
    @Column(name = "first_name")
    String firstName;
    @Column(name = "last_name")
    String lastName;
    @Column(name = "age")
    int age;
    @Column(name = "email")
    String email;
    @Column(name = "subject")
    String subject;
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "student_teacher", joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    Set<Teacher> teachers;

    public Student(){}

    public Student(String firstName, String lastName, int age, String email, String subject) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.subject = subject;
    }

    public Student(String firstName, String lastName, int age, String email, String subject, Set<Teacher> teachers) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.subject = subject;
        this.teachers = teachers;
    }

}
