import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShowIcon from '@material-ui/icons/Visibility';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as student from '../../../core/student';
import * as teacher from '../../../core/teacher';
import ConfirmationDialog from '../../ConfirmationDialog';
import Title from '../../Title';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TableSortLabel} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import classes from "*.module.css";
import TextField from "@material-ui/core/TextField";
import {validateFirstName} from "../student/add/AddStudentForm";


interface SearchProps {
    classes: any;
}

export default function Search(props: SearchProps) {


    const { register, handleSubmit, control, errors, reset } = useForm();

    var [students, setStudents] = useState<student.Student[]>([]);
    var [teachers, setTeachers] = useState<teacher.Teacher[]>([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentId, setStudentId] = useState<number | null>(null)
    const [studentDeleted, setStudentDeleted] = useState<boolean | null>(null);

    // const [state, setState] = React.useState<{ filter: string}>({
    //     filter: 'nazwisko malejaco',
    // });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        // const name = event.target.name as keyof typeof state;
        console.log("zmiania", event.target.value)
        if(event.target.value==""){
            setStudents([]);
            setTeachers([]);
        }
        else {
            student.searchStudent(event.target.value)
                .then((students1) => {
                    setStudents(students1)
                    console.log(students)
                })
                .catch((error) => {
                });
            teacher.searchTeacher(event.target.value)
                .then((teacher1) => {
                    setTeachers(teacher1)
                    console.log(students)
                })
                .catch((error) => { });

            // return () => {
            //     console.log(students);
            //     mounted = false
            // }
        }
    };



    return (
        <React.Fragment>
            <Title>Wyszukiwarka</Title>
            <form
                className={props.classes.form}
                noValidate
            >
                <TextField
                    fullWidth
                    id="search"
                    name="search"
                    label="Wyszukaj studenta lub nauczyciela"
                    onChange={handleChange}
                />
            </form>
            <br/>
            <br/>
            <br/>


            <Title>Studenci</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Imię
                        </TableCell>
                        <TableCell>Nazwisko</TableCell>
                        <TableCell>Wiek</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Kierunek</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.values(students).map((student) => (
                        <TableRow key={student.studentId}>
                            <TableCell>{student.firstName}</TableCell>
                            <TableCell>{student.lastName}</TableCell>
                            <TableCell>{student.age}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.subject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br/>
            <br/>
            <br/>

            <Title>Nauczyciele</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Imię</TableCell>
                        <TableCell>Nazwisko</TableCell>
                        <TableCell>Wiek</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Przedmiot</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.values(teachers).map((teacher) => (
                        <TableRow key={teacher.teacherId}>
                            <TableCell>{teacher.firstName}</TableCell>
                            <TableCell>{teacher.lastName}</TableCell>
                            <TableCell>{teacher.age}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.course}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment >
    );
}
