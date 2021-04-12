import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import * as teacher from '../../../core/teacher';
import * as student from '../../../core/student';
import ConfirmationDialog from '../../ConfirmationDialog';
import Title from '../../Title';

interface TeachersByStudentProps {
    classes: any;
    studentId: number;
}

export default function TeachersByStudent(props: TeachersByStudentProps) {

    var [teachers, setTeachers] = useState<teacher.Teacher[]>([]);
    var [student1, setStudent1] = useState<student.Student>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [teacherId, setTeacherId] = useState<number | null>(null)
    const [teacherDeleted, setTeacherDeleted] = useState<boolean | null>(null);

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setTeacherDeleted(null);
        if (teacherId !== null) {
            teacher.deleteStudentTeacherConnection(props.studentId,teacherId)
                .then((result) => {
                    if(result==true){
                    teacher.getTeachersByStudentId(props.studentId)
                        .then((teachers1) => {
                            setTeachers(teachers1)
                        })
                        .catch((error) => {
                        });
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
        if(teachers.length==0) {
            teacher.getTeachersByStudentId(props.studentId)
                .then((teachers1) => {
                    setTeachers(teachers1)
                })
                .catch((error) => {
                });
            student.getStudent(props.studentId)
                .then((student2) =>{
                    if(student2!=null) {
                        setStudent1(student2)
                    }
                })
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
            <Title>Nauczyciele studenta {student1?.firstName} {student1?.lastName}</Title>

            <div style={{ marginBottom: 10 }}>
                {teacherDeleted !== null && teacherDeleted === true && <Alert severity="success">Powiązanie studenta i nauczyciela zostalo usunięte.</Alert>}
                {teacherDeleted !== null && teacherDeleted === false && <Alert severity="error">Wystąpił błąd. Spróbuj ponownie.</Alert>}
            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Imię</TableCell>
                        <TableCell>Nazwisko</TableCell>
                        <TableCell>Wiek</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell></TableCell>
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
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setTeacherId(teacher.teacherId);
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
