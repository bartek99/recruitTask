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
import * as teacher from '../../../core/teacher';
import ConfirmationDialog from '../../ConfirmationDialog';
import Title from '../../Title';
import {MenuItem, Select} from "@material-ui/core";
import {Pagination} from '../../Pagination';

interface TeacherProps {
    classes: any;
}

export default function Teachers(props: TeacherProps) {

    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1)
    const handlePages = (updatePage: number) => {
        teacher.getTeachersByPage(updatePage,sort)
            .then((teachers1) => {
                setTeachers(teachers1)
            })
            .catch((error) => {
            });
        setPage(updatePage);


    }
    const [sort,setSort]=useState<unknown>("Not sorted");

    var [teachers, setTeachers] = useState<teacher.Teacher[]>([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [teacherId, setTeacherId] = useState<number | null>(null)
    const [teacherDeleted, setTeacherDeleted] = useState<boolean | null>(null);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSort(event.target.value);
        teacher.getTeachersByPage(1,event.target.value)
            .then((teachers1) => {
                setTeachers(teachers1)
                setPage(1);
                console.log(teachers)
            })
            .catch((error) => { });
    };

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setTeacherDeleted(null);
        if (teacherId !== null) {
            teacher.deleteTeacher(teacherId)
                .then((result) => {
                    if (result) {
                        delete teachers[teacherId];
                        setTeachers({ ...teachers });
                        setTeacherDeleted(result);
                        teacher.getTeachersByPage(page,sort)
                            .then((teachers1) => {
                                if(teachers1.length!=0 || totalPages==1) {
                                    setTeachers(teachers1)
                                }
                                else {
                                    teacher.getTeachers()
                                        .then((teachers2) => {
                                            setTotalPages(Math.ceil(teachers2.length / 10));
                                            teacher.getTeachersByPage(page-1, sort)
                                                .then((teachers3) => {
                                                    setTeachers(teachers3)
                                                    // if(totalPages!=1) {
                                                        setPage(totalPages - 1);
                                                    // }
                                                })
                                                .catch((error) => {
                                                });
                                        })
                                }
                            })
                            .catch((error) => { });
                    } else {
                        setTeacherDeleted(false);
                    }
                })

        }
    };

    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        let mounted = true;
        if(teachers.length==0) {
            teacher.getTeachers()
                .then((teachers2) => {
                    setTotalPages(Math.ceil(teachers2.length/10));
                    if(totalPages==0){
                        setTotalPages(1)
                    }
                })
            teacher.getTeachersByPage(page,sort)
                .then((teachers1) => {
                    setTeachers(teachers1)
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
            <Title>Nauczyciel</Title>
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
                        <MenuItem value={"Age ascending"}>Wiek od najmłodszego</MenuItem>
                        <MenuItem value={"Age descending"}>Wiek od najstarszego</MenuItem>
                        <MenuItem value={"Email ascending"}>Email od A do Z</MenuItem>
                        <MenuItem value={"Email descending"}>Email od Z do A</MenuItem>
                        <MenuItem value={"Course ascending"}>Przedmiot od A do Z</MenuItem>
                        <MenuItem value={"Course descending"}>Przedmiot od Z do A</MenuItem>
                    </Select>
                </label>
            </form>
            <br/>
            <div style={{ marginBottom: 10 }}>
                {teacherDeleted !== null && teacherDeleted === true && <Alert severity="success">Nauczyciel został usunięty.</Alert>}
                {teacherDeleted !== null && teacherDeleted === false && <Alert severity="error">Wystąpił błąd. Spróbuj ponownie.</Alert>}
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Imię
                        </TableCell>
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
                                <IconButton aria-label="show" component={RouterLink} to={`/show-teacher/${teacher.teacherId}`}>
                                    <ShowIcon />
                                </IconButton>
                                <IconButton aria-label="edit" component={RouterLink} to={`/edit-teacher/${teacher.teacherId}`}>
                                    <EditIcon />
                                </IconButton>
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
