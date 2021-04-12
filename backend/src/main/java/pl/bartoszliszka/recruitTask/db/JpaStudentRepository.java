package pl.bartoszliszka.recruitTask.db;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;
import pl.bartoszliszka.recruitTask.data.Student;
import pl.bartoszliszka.recruitTask.data.StudentRepository;
import pl.bartoszliszka.recruitTask.data.Teacher;
import java.util.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public class JpaStudentRepository implements StudentRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    @Override
    public Optional<Student> addStudent(String firstName, String lastName, int age, String email, String subject) {
        Student student=new Student(firstName,lastName,age,email,subject);
        try {
            em.persist(student);
            return Optional.of(student);
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
    public Optional<Student> getStudentById(int studentId) {
        String query="from Student s where s.studentId=:studentId";
        try {
            return Optional
                    .ofNullable(em.find(Student.class, studentId));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public boolean addStudent(Student student, Teacher teacher) {
        Set<Teacher> teachers=student.getTeachers();
        teachers.add(teacher);
        student.setTeachers(teachers);
        try {
            em.merge(student);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Student> getStudents() {
        String query="from Student s";
        return em.createQuery(query,Student.class).getResultList();
    }

    @Transactional
    @Override
    public Optional<Boolean> deleteStudentById(int studentId) {
        Student student=em.find(Student.class,studentId);
        try {
            em.remove(student);
            return Optional.ofNullable(true);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Student> getSortedStudent(String sort) {
        String query=null;
        switch(sort){
            case "First name ascending":{
                query="from Student s order By s.firstName ASC, s.lastName ASC";
                break;
            }
            case "First name descending":{
                query="from Student s order by s.firstName DESC, s.lastName DESC";
                break;
            }
            case "Last name ascending":{
                query="from Student s order By s.lastName ASC, s.firstName ASC";
                System.out.println(query);
                break;
            }
            case "Last name descending":{
                query="from Student s order By s.lastName DESC, s.firstName DESC";
                break;
            }
            case "Age ascending":{
                query="from Student s order By s.age ASC";
                break;
            }
            case "Age descending":{
                query="from Student s order By s.age DESC";
                break;
            }
            case "Email ascending":{
                query="from Student s order By s.email ASC";
                break;
            }
            case "Email descending":{
                query="from Student s order By s.email DESC";
                break;
            }
            case "Subject ascending":{
                query="from Student s order By s.subject ASC";
                break;
            }
            case "Subject descending":{
                query="from Student s order By s.subject DESC";
                break;
            }
        }
        return em.createQuery(query,Student.class).getResultList();
    }

    @Transactional
    @Override
    public Optional<Boolean> updateStudentById(int studentId, String firstName, String lastName, int age, String email, String subject) {
        Student student=em.find(Student.class,studentId);
        student.setFirstName(firstName);
        student.setLastName(lastName);
        student.setAge(age);
        student.setEmail(email);
        student.setSubject(subject);
        try {
            em.merge(student);
            return Optional.of(true);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public List<Student> getStudentsByName(String nameStudent) {
        String word1="";
        String word2="";
        int counter=0;
        int counter2=0;
        for(int i=0;i<nameStudent.length();i++){
            if(nameStudent.charAt(i)!=' '){
                counter2=i;
                break;
            }
        }
        for(int i=counter2;i<nameStudent.length();i++){
            if(nameStudent.charAt(i)==' '){
                counter=i;
                break;
            }
        }
        if(counter==0){
            word1=nameStudent.substring(counter2,nameStudent.length());
        }else{
            word1=nameStudent.substring(counter2,counter);
            for(int i=counter;i<nameStudent.length();i++){
                if(nameStudent.charAt(i)!=' '){
                    counter=i;
                    break;
                }
            }
            if(counter!=word1.length()+counter2) {
                for (int i = counter; i < nameStudent.length(); i++) {
                    if (nameStudent.charAt(i) == ' ') {
                        word2 = nameStudent.substring(counter, i);
                        counter=i;
                        break;
                    }
                }
                if(word2.equals("")){
                    word2=nameStudent.substring(counter,nameStudent.length());
                }else{
                    for (int i = counter; i <nameStudent.length() ; i++) {
                        if (nameStudent.charAt(i) != ' ') {
                            List<Student> students=new LinkedList<>();
                            return students;
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
        query="from Student s where s.firstName like :word12 or s.lastName like :word12";
        }else{
            query="from Student s where (s.firstName=:word1 and s.lastName like :word22) or (s.lastName=:word1 and s.firstName like :word22)";
        }
        List<Student> s=new LinkedList<>();
        if(word1.equals("")){
          return s;
        }
        else if(word2.equals("")) {
            return em.createQuery(query, Student.class).setParameter("word12", word12).getResultList();
        }
        return em.createQuery(query, Student.class)
                .setParameter("word1", word1)
                .setParameter("word22",word22)
                .getResultList();
    }


    @Override
    public List<Student> getStudentsByTeacherId(int teacherId) {
        Optional<Teacher> teacher=Optional.ofNullable(em.find(Teacher.class,teacherId));
        String query="from Student s";
        List<Student> students=em.createQuery(query,Student.class).getResultList();
        List<Student> students1=new LinkedList<>();

        if(!teacher.isEmpty()){
            for (int i = 0; i < students.size(); i++) {
                for (Teacher teacher1:students.get(i).getTeachers()){
                    if(teacher1.equals(teacher.get())){
                        students1.add(students.get(i));
                    }
                }
            }
        }
        return students1;
    }


    @Transactional
    @Override
    public Optional<Boolean> deleteStudentTeacherConnection(int teacherId, int studentId) {
        Optional<Student> student=Optional.ofNullable(em.find(Student.class,studentId));
        Optional<Teacher> teacher=Optional.ofNullable(em.find(Teacher.class,teacherId));
        Set<Teacher> teachers=new HashSet<>();
        if(!student.isEmpty()) {
            for (Teacher teacher1 : student.get().getTeachers()){
                if(!teacher1.equals(teacher.get())){
                    teachers.add(teacher1);
                }
            }
            student.get().setTeachers(teachers);
        }
        try {
            em.merge(student.get());
            return Optional.ofNullable(true);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}
