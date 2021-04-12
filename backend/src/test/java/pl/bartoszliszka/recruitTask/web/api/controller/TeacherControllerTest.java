package pl.bartoszliszka.recruitTask.web.api.controller;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.bartoszliszka.recruitTask.request.AddTeacherRequest;
import pl.bartoszliszka.recruitTask.web.api.response.TeacherResponse;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TeacherControllerTest {

    @Autowired
    TeacherController teacherController;

    @Test
    public void getTeachers() {
        Assert.assertNotSame(-1,teacherController.getTeachers().result().size());
    }


    @Test
    public void addTeacher() {
        AddTeacherRequest addTeacherRequest=new AddTeacherRequest(
                "Dariusz",
                "Podkowa",
                40,
                "podkowa@example.com",
                "Systemy operacyjne"
        );
        TeacherResponse teacherResponse=teacherController.addTeacher(addTeacherRequest).result();
        int id=teacherResponse.teacherId();
        Assert.assertEquals(addTeacherRequest.email(),teacherResponse.email());
        teacherController.deleteTeacher(id);
    }

    @Test
    public void notFindTeachersByEmail() {
        String email="abc";
        Assert.assertTrue(teacherController.searchTeachersByEmail(email,null).result().isEmpty());
    }

    @Test
    public void notFindTeachersByEmailAndNotTeacherId() {
        String email="urbanski@example.com";
        int id=teacherController.searchTeachersByEmail(email,null).result().get(0).teacherId();
        Assert.assertTrue(teacherController.searchTeachersByEmail(email,id).result().isEmpty());
    }

    @Test
    public void findTeachersByEmail() {
        String email="urbanski@example.com";
        Assert.assertFalse(teacherController.searchTeachersByEmail(email,null).result().isEmpty());
    }

    @Test
    public void findTeachersByEmailAndNotTeacherId() {
        String email="urbanski@example.com";
        int id=teacherController.searchTeachersByEmail(email,null).result().get(0).teacherId();
        id++;
        Assert.assertFalse(teacherController.searchTeachersByEmail(email,id).result().isEmpty());
    }


    @Test
    public void notFindStudentsByEmail() {
        String email="abc";
        Assert.assertTrue(teacherController.searchStudentsByEmail(email).result().isEmpty());
    }

    @Test
    public void findStudentsByEmail() {
        String email="krasny@example.com";
        Assert.assertFalse(teacherController.searchStudentsByEmail(email).result().isEmpty());
    }

    @Test
    public void getTeacherById() {
        int teacherId=teacherController.getTeachers().result().get(0).teacherId();
        Assert.assertEquals(teacherId,teacherController.getTeacherById(teacherId).result().teacherId());
    }
}