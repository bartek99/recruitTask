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
import {MenuItem, Select} from "@material-ui/core";
import {Pagination} from '../../../Pagination';
import * as teacher from "../../../../core/teacher";


interface StudentProps {
    classes: any;
}

export default function Students(props: StudentProps) {

        const [page, setPage] = useState(1);
        const [totalPages,setTotalPages]=useState(0)
        const handlePages = (updatePage: number) => {
            student.getStudentsByPage(updatePage,sort)
                .then((students1) => {
                    setStudents(students1)
                })
                .catch((error) => {
                });
            setPage(updatePage);


        }
    const [sort,setSort]=useState<unknown>("Not sorted");

    var [students, setStudents] = useState<student.Student[]>([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentId, setStudentId] = useState<number | null>(null)
    const [studentDeleted, setStudentDeleted] = useState<boolean | null>(null);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        console.log("zmiania", event.target.value)
        setSort(event.target.value);
        student.getStudentsByPage(1,event.target.value)
            .then((students1) => {
                setStudents(students1)
                setPage(1);
            })
            .catch((error) => { });
    };

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setStudentDeleted(null);
        if (studentId !== null) {
            student.deleteStudent(studentId)
                .then((result) => {
                    if (result) {
                        delete students[studentId];
                        setStudents({ ...students });
                        setStudentDeleted(result);
                        student.getStudentsByPage(page,sort)
                            .then((students1) => {
                                if(students1.length!=0) {
                                    setStudents(students1)
                                }
                                else {
                                    student.getStudents()
                                        .then((students2) => {
                                            setTotalPages(Math.ceil(students2.length / 10));
                                            student.getStudentsByPage(page-1, sort)
                                                .then((students3) => {
                                                    setStudents(students3)
                                                    setPage(totalPages-1);
                                                })
                                                .catch((error) => {
                                                });
                                        })
                                }
                            })
                            .catch((error) => { });

                    } else {
                        setStudentDeleted(false);
                    }
                })
        }
    };

    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        let mounted = true;
        if(students.length==0) {
            student.getStudents()
                .then((students2) => {
                    setTotalPages(Math.ceil(students2.length/10));
                })
            student.getStudentsByPage(page,sort)
                .then((students1) => {
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
            <Title>Studenci</Title>
            <form
                className={props.classes.form}
                noValidate
            >
                <label>
                        <Select
                            onChange={handleChange}
                            labelId="filter"
                            id="filter"
                        >
                            <MenuItem value={"First name ascending"}>Imię od A do Z</MenuItem>
                            <MenuItem value={"First name descending"}>Imię od Z do A</MenuItem>
                            <MenuItem value={"Last name ascending"}>Nazwisko od A do Z</MenuItem>
                            <MenuItem value={"Last name descending"}>Nazwisko od Z do A</MenuItem>
                            <MenuItem value={"Age ascending"}>Wiek od A do Z</MenuItem>
                            <MenuItem value={"Age descending"}>Wiek od Z do A</MenuItem>
                            <MenuItem value={"Email ascending"}>Email od A do Z</MenuItem>
                            <MenuItem value={"Email descending"}>Email od Z do A</MenuItem>
                            <MenuItem value={"Subject ascending"}>Przedmiot od A do Z</MenuItem>
                            <MenuItem value={"Subject descending"}>Przedmiot od Z do A</MenuItem>
                        </Select>
                </label>
            </form>
            <br/>
            <div style={{ marginBottom: 10 }}>
                {studentDeleted !== null && studentDeleted === true && <Alert severity="success">Student został usunięty.</Alert>}
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
                                <IconButton aria-label="show" component={RouterLink} to={`/show-student/${student.studentId}`}>
                                    <ShowIcon />
                                </IconButton>
                                <IconButton aria-label="edit" component={RouterLink} to={`/edit-student/${student.studentId}`}>
                                    <EditIcon />
                                </IconButton>
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
            <br/>
            <br/>
            <br/>
            <div className="container">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePagination={handlePages}
                />
            </div>
        </React.Fragment >
    );
}
