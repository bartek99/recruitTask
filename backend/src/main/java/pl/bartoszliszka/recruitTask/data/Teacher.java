package pl.bartoszliszka.recruitTask.data;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    int teacherId;
    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;
    @Column(name = "age")
    int age;
    @Column(name="email")
    String email;
    @Column(name = "course")
    String course;
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "student_teacher", joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))
    Set<Student> students;

    public Teacher() {
    }

    public Teacher(String firstName, String lastName, int age, String email, String course, Set<Student> students) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.course = course;
        this.students = students;
    }

    public Teacher(String firstName, String lastName, int age, String email, String course) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.course = course;
    }
}
