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
import * as student from '../../../../core/student';
import ConfirmationDialog from '../../../ConfirmationDialog';
import Title from '../../../Title';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TableSortLabel} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import classes from "*.module.css";


interface StudentsByTeacherProps {
    classes: any;
    teacherId: number;
}


export default function StudentsByTeacher(props: StudentsByTeacherProps) {


    const { register, handleSubmit, control, errors, reset } = useForm();

    var [students, setStudents] = useState<student.Student[]>([]);
    // var [students, setStudents] = useState<{ [key: number]: student.Student }>({});

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentId, setStudentId] = useState<number | null>(null)
    const [studentDeleted, setStudentDeleted] = useState<boolean | null>(null);


    const handleOk = () => {
        setDeleteDialogOpen(false);
        setStudentDeleted(null);
        if (studentId !== null) {
            student.deleteStudentTeacherConnection(props.teacherId,studentId)
                .then((result) => {
                    if(result==true){
                    student.getStudentsByTeacherId(props.teacherId)
                        .then((students1) => {
                            // if (mounted) {
                            //     const studentsById = students.reduce((studentsById, student) => { return {
                            //         ...studentsById, [student.studentId]: student }; }, {});
                            //     setStudents(studentsById);
                            // }
                            setStudents(students1)
                        })
                        .catch((error) => {
                        });
                    // setTeachers(teachers1)
                }})
                .catch((error) => {
                });
        }
    };

    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        let mounted = true;
        if(students.length==0) {
            student.getStudentsByTeacherId(props.teacherId)
                .then((students1) => {
                    // if (mounted) {
                    //     const studentsById = students.reduce((studentsById, student) => { return {
                    //         ...studentsById, [student.studentId]: student }; }, {});
                    //     setStudents(studentsById);
                    // }
                    setStudents(students1)
                })
                .catch((error) => {
                });
        }
        return () => {
            mounted = false
        }
    }, []);

    return (
        <React.Fragment>
            <ConfirmationDialog
                message="Czy na pewno usunąć"
                open={deleteDialogOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <Title>Nauczyciele studenta</Title>

            <div style={{ marginBottom: 10 }}>
                {studentDeleted !== null && studentDeleted === true && <Alert severity="success">Powiązanie studenta i nauczyciela zostalo usunięte.</Alert>}
                {studentDeleted !== null && studentDeleted === false && <Alert severity="error">Wystąpił błąd. Spróbuj ponownie.</Alert>}
            </div>


            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Imię
                        </TableCell>
                        <TableCell>Nazwisko</TableCell>
                        <TableCell>Wiek</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Kierunek</TableCell>
                        <TableCell></TableCell>
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
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setStudentId(student.studentId);
                                    setDeleteDialogOpen(true);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment >
    );
}
