package pl.bartoszliszka.recruitTask.db;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;
import pl.bartoszliszka.recruitTask.data.Student;
import pl.bartoszliszka.recruitTask.data.Teacher;
import pl.bartoszliszka.recruitTask.data.TeacherRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.*;

@Repository
public class JpaTeacherRepository implements TeacherRepository {

    @PersistenceContext
    EntityManager em;

    @Transactional
    @Override
    public Optional<Teacher> addTeacher(String firstName, String lastName, int age, String email, String course) {
        Teacher teacher=new Teacher(firstName,lastName,age,email,course);
        try {
            em.persist(teacher);
            return Optional.of(teacher);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Student> getStudentsByEmail(String email) {
        String query="from Student s where s.email=:email ";
        try {
            return Optional
                    .ofNullable(em.createQuery(query, Student.class).setParameter("email", email).getSingleResult());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Teacher> getTeachersByEmail(String email) {
        String query="from Teacher t where t.email=:email ";
        try {
            return Optional
                    .ofNullable(em.createQuery(query, Teacher.class).setParameter("email", email).getSingleResult());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Teacher> getTeacherById(int teacherId) {
        String query="from Teacher t where t.teacherId=:teacherId";
        try {
            return Optional
                    .ofNullable(em.createQuery(query, Teacher.class).setParameter("teacherId", teacherId).getSingleResult());
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Teacher> getTeachers() {
        String query="from Teacher t";
        return em.createQuery(query,Teacher.class).getResultList();
    }

    @Override
    public List<Teacher> getSortedTeacher(String sort) {
        String query=null;
        switch(sort){
            case "First name ascending":{
                query="from Teacher t order By t.firstName ASC, t.lastName ASC";
                break;
            }
            case "First name descending":{
                query="from Teacher t order by t.firstName DESC, t.lastName DESC";
                break;
            }
            case "Last name ascending":{
                query="from Teacher t order By t.lastName ASC, t.firstName ASC";
                System.out.println(query);
                break;
            }
            case "Last name descending":{
                query="from Teacher t order By t.lastName DESC, t.firstName DESC";
                break;
            }
            case "Age ascending":{
                query="from Teacher t order By t.age ASC";
                break;
            }
            case "Age descending":{
                query="from Teacher t order By t.age DESC";
                break;
            }
            case "Email ascending":{
                query="from Teacher t order By t.email ASC";
                break;
            }
            case "Email descending":{
                query="from Teacher t order By t.email DESC";
                break;
            }
            case "Course ascending":{
                query="from Teacher t order By t.course ASC";
                break;
            }
            case "Course descending":{
                query="from Teacher t order By t.course DESC";
                break;
            }
        }
        return em.createQuery(query,Teacher.class).getResultList();
    }

    @Transactional
    @Override
    public Optional<Boolean> deleteTeacherById(int teacherId) {
        Teacher teacher=em.find(Teacher.class,teacherId);
        try {
            em.remove(teacher);
            return Optional.ofNullable(true);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public Optional<Boolean> updateTeacherById(int teacherId, String firstName, String lastName, int age, String email, String course) {
        Teacher teacher=em.find(Teacher.class,teacherId);
        teacher.setFirstName(firstName);
        teacher.setLastName(lastName);
        teacher.setAge(age);
        teacher.setEmail(email);
        teacher.setCourse(course);
        try {
            em.merge(teacher);
            return Optional.of(true);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public List<Teacher> getTeachersByName(String nameTeacher) {
        String word1="";
        String word2="";
        int counter=0;
        int counter2=0;
        for(int i=0;i<nameTeacher.length();i++){
            if(nameTeacher.charAt(i)!=' '){
                counter2=i;
                break;
            }
        }
        for(int i=counter2;i<nameTeacher.length();i++){
            if(nameTeacher.charAt(i)==' '){
                counter=i;
                break;
            }
        }
        if(counter==0){
            word1=nameTeacher.substring(counter2,nameTeacher.length());
        }else{
            word1=nameTeacher.substring(counter2,counter);
            for(int i=counter;i<nameTeacher.length();i++){
                if(nameTeacher.charAt(i)!=' '){
                    counter=i;
                    break;
                }
            }
            if(counter!=word1.length()+counter2) {
                for (int i = counter; i < nameTeacher.length(); i++) {
                    if (nameTeacher.charAt(i) == ' ') {
                        word2 = nameTeacher.substring(counter, i);
                        counter=i;
                        break;
                    }
                }
                if(word2.equals("")){
                    word2=nameTeacher.substring(counter,nameTeacher.length());
                }else{
                    for (int i = counter; i <nameTeacher.length() ; i++) {
                        if (nameTeacher.charAt(i) != ' ') {
                            List<Teacher> teachers=new LinkedList<>();
                            return teachers;
                        }
                    }
                }
            }
        }
        String word12="";
        String word22="";
        if(!word1.equals("")){
            word12=word1+"%";
        }
        if(!word2.equals("")){
            word22=word2+"%";
        }
        System.out.println(word1);
        System.out.println(word2);
        String query=null;
        if(word2.equals("")){
            query="from Teacher t where t.firstName like :word12 or t.lastName like :word12";
        }else{
            query="from Teacher t where (t.firstName=:word1 and t.lastName like :word22) or (t.lastName=:word1 and t.firstName like :word22)";
        }
        if(word2.equals("")) {
            return em.createQuery(query, Teacher.class).setParameter("word12", word12).getResultList();
        }
        return em.createQuery(query, Teacher.class)
                .setParameter("word1", word1)
                .setParameter("word22",word22)
                .getResultList();
    }

    @Override
    public List<Teacher> getTeachersByStudentId(int studentId) {
        Optional<Student> student=Optional.ofNullable(em.find(Student.class,studentId));
        String query="from Teacher t";
        List<Teacher> teachers=em.createQuery(query,Teacher.class).getResultList();
        List<Teacher> teachers1=new LinkedList<>();
        if(!student.isEmpty()){
            for (int i = 0; i < teachers.size(); i++) {
                boolean isStudent=false;
                for (Student student1:teachers.get(i).getStudents()){
                    if(student1.equals(student.get())){
                        teachers1.add(teachers.get(i));
                    }
                }
            }
        }
        return teachers1;
    }

    @Transactional
    @Override
    public Optional<Boolean> deleteStudentTeacherConnection(int studentId, int teacherId) {
        Optional<Student> student=Optional.ofNullable(em.find(Student.class,studentId));
        Optional<Teacher> teacher=Optional.ofNullable(em.find(Teacher.class,teacherId));
        Set<Student> students=new HashSet<>();
        if(!teacher.isEmpty()) {
            for (Student student1 : teacher.get().getStudents()){
                if(!student1.equals(student.get())){
                    students.add(student1);
                }
            }
            teacher.get().setStudents(students);
        }
        try {
            em.merge(teacher.get());
            return Optional.ofNullable(true);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }

    }
}
