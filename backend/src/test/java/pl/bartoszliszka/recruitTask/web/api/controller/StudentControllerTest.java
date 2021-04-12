package pl.bartoszliszka.recruitTask.web.api.controller;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.bartoszliszka.recruitTask.request.AddStudentRequest;
import pl.bartoszliszka.recruitTask.web.api.response.StudentResponse;



@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentControllerTest {

    @Autowired
    StudentController studentController;

    @Test
    public void getStudents() {
        Assert.assertNotSame(-1,studentController.getStudents().result().size());
    }


    @Test
    public void addStudent() {
        AddStudentRequest addStudentRequest=new AddStudentRequest(
                "Dariusz",
                "Podkowa",
                20,
                "podkowa@example.com",
                "Informatyka"
        );
        StudentResponse studentResponse=studentController.addStudent(addStudentRequest).result();
        int id=studentResponse.studentId();
        Assert.assertEquals(addStudentRequest.email(),studentResponse.email());
        studentController.deleteStudent(id);
    }

    @Test
    public void notFindStudentsByEmail() {
        String email="abc";
        Assert.assertTrue(studentController.searchStudentsByEmail(email,null).result().isEmpty());
    }

    @Test
    public void notFindStudentsByEmailAndNotStudentId() {
        String email="krasny@example.com";
        int id=studentController.searchStudentsByEmail(email,null).result().get(0).studentId();
        Assert.assertTrue(studentController.searchStudentsByEmail(email,id).result().isEmpty());
    }

    @Test
    public void findStudentsByEmail() {
        String email="krasny@example.com";
        Assert.assertFalse(studentController.searchStudentsByEmail(email,null).result().isEmpty());
    }

    @Test
    public void findStudentsByEmailAndNotStudentId() {
        String email="krasny@example.com";
        int id=studentController.searchStudentsByEmail(email,null).result().get(0).studentId();
        id++;
        Assert.assertFalse(studentController.searchStudentsByEmail(email,id).result().isEmpty());
    }


    @Test
    public void notFindTeachersByEmail() {
        String email="abc";
        Assert.assertTrue(studentController.searchTeachersByEmail(email).result().isEmpty());
    }

    @Test
    public void findTeachersByEmail() {
        String email="panek@example.com";
        Assert.assertFalse(studentController.searchTeachersByEmail(email).result().isEmpty());
    }

    @Test
    public void getStudentById() {
        int studentId=studentController.getStudents().result().get(0).studentId();
        Assert.assertEquals(studentId,studentController.getStudentById(studentId).result().studentId());
    }

}