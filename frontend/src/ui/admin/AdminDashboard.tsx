import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountBalance, Announcement, Business, Comment, DateRange, Event, EventSeat, Grade, Group, MeetingRoom, School, Subject } from '@material-ui/icons';
import People from '@material-ui/icons/People';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import AddStudentPage from './student/add/AddStudentPage';
import AddTeacherPage from './teacher/add/AddTeacherPage';
import AddStudentToTeacherPage from "./student/add/AddStudentToTeacherPage";
import StudentsPage from "./student/show/StudentsPage";
import TeachersPage from "./teacher/show/TeachersPage";
import EditStudentPage from "./student/edit/EditStudentPage";
import EditTeacherPage from "./teacher/edit/EditTeacherPage";
import SearchPage from "./search/SearchPage";
import TeachersByStudentPage from "./student/show/TeachersByStudentPage";
import StudentsByTeacherPage from "./teacher/show/StudentsByTeacherPage";


export default function AdminDashboard() {
  return (
    <Dashboard  title="Zadanie rekrutacyjne" >
      <Route exact path="/showStudents">
            <StudentsPage />
      </Route>
        <Route exact path="/showTeachers">
            <TeachersPage />
        </Route>
      <Route exact path="/addStudent">
        <AddStudentPage />
      </Route>
        <Route exact path="/addTeacher">
            <AddTeacherPage />
        </Route>
        <Route exact path="/addStudentToTeacher">
            <AddStudentToTeacherPage/>
        </Route>
        <Route exact path="/show-student/:studentId">
            <TeachersByStudentPage />
        </Route>
        <Route exact path="/edit-student/:studentId">
            <EditStudentPage />
        </Route>
        <Route exact path="/show-teacher/:teacherId">
            <StudentsByTeacherPage />
        </Route>
        <Route exact path="/edit-teacher/:teacherId">
            <EditTeacherPage />
        </Route>
        <Route exact path="/search">
            <SearchPage />
        </Route>
    </Dashboard>
  );
}
