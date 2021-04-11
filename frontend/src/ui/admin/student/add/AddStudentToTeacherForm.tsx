import * as student from '../../../../core/student';
import * as teacher from '../../../../core/teacher';
import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TableCell} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
interface AddStudentToTeacherFormProps {
    classes: any;
    setResult: (result: boolean | null) => void;
}

export default function AddStudentToTeacherForm(props: AddStudentToTeacherFormProps) {
    const {handleSubmit, control, errors, reset } = useForm();

    const [students, setStudents] = React.useState<student.Student[]>([]);
    const [teachers, setTeachers] = React.useState<teacher.Teacher[]>([]);
    useEffect(() => {
        let mounted = true;
        student.getStudents()
            .then((students) => {
                if (mounted) {
                    setStudents(students);
                }
            })
            .catch((error) => { });

        return () => {
            mounted = false
        }
    }, []);


    useEffect(() => {
        let mounted = true;
        teacher.getTeachers()
            .then((teachers) => {
                if (mounted) {
                    setTeachers(teachers);
                }
            })
            .catch((error) => { });

        return () => {
            mounted = false
        }
    }, []);



    const onSubmit = (data: {studentId: number, teacherId: number }) => {
        props.setResult(null);
        student.addStudentToTeacher(data.studentId,data.teacherId)
            .then((result) => {
                if (result) {
                    props.setResult(true);
                    reset();
                } else {
                    props.setResult(false);
                }
            })
            .catch((error) => props.setResult(false));
    }


    return (

        <Box width={1 / 4}>
            <form
                className={props.classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <FormControl fullWidth className={props.classes.formControl}>
                        <InputLabel id="studentIdLabel">Student</InputLabel>
                        <Controller
                            name="studentId"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'To pole jest wymagane'
                                }
                            }}
                            as={
                                <Select
                                    labelId="studentIdLabel"
                                    id="studentId"
                                    error={errors.studentId ? true : false}
                                >
                                    {students.map(student =>
                                        <MenuItem key={student.studentId}
                                                  value={student.studentId}>{student.firstName + ' ' + student.lastName}</MenuItem>)}
                                </Select>
                            }
                        />
                        <FormHelperText error={errors.studentId ? true : false}>{errors.studentId
                        && errors.studentId.message}</FormHelperText>
                    </FormControl>
                </div>

                <div>
                    <FormControl fullWidth className={props.classes.formControl}>
                        <InputLabel id="teacherIdLabel">Nauczyciel</InputLabel>
                        <Controller
                            name="teacherId"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'To pole jest wymagane'
                                }
                            }}
                            as={
                                <Select
                                    labelId="teacherIdLabel"
                                    id="teacherId"
                                    error={errors.teacherId ? true : false}
                                >
                                    {teachers.map(teacher =>
                                        <MenuItem key={teacher.teacherId}
                                                  value={teacher.teacherId}>{teacher.firstName + ' ' + teacher.lastName}</MenuItem>)}
                                </Select>
                            }
                        />
                        <FormHelperText error={errors.teacherId ? true : false}>{errors.teacherId
                        && errors.teacherId.message}</FormHelperText>
                    </FormControl>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                    >
                        Dodaj
                    </Button>
                </div>
            </form>
        </Box>
    );
}