import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as teacher from '../../../core/teacher';
import {validateAge, validateFirstName} from "../add/AddTeacherForm";

interface EditTeacherFormProps {
    classes: any;
    teacherId: number;
    setResult: (result: boolean | null) => void;
}

export default function EditTeacherForm(props: EditTeacherFormProps) {
    const { handleSubmit, errors, control, setError, reset } = useForm();

    useEffect(() => {
        let mounted = true;
        teacher.getTeacher(props.teacherId)
            .then((teacher) => {
                if (mounted && teacher) {
                    reset(teacher);
                }
                console.log(teacher)
            })
        return () => {
            mounted = false;
        }
    }, [reset, props]);

    const onSubmit = (editedTeacher: teacher.EditedTeacher) => {
        props.setResult(null);
        teacher.teacherExists(editedTeacher.email, props.teacherId)
            .then((result) => {
                if (result === true) {
                    setError('email', { message: 'Użytkownik o tym adresie e-mail już istnieje' })
                } else {
                    teacher.studentExists(editedTeacher.email)
                        .then((result2) => {
                            if(result2===true){
                                setError('email', {message: 'Użytkownik o tym adresie e-mail juz istenieje'})
                            }else{
                                teacher.updateTeacher(props.teacherId, editedTeacher)
                                    .then((teacher) => {
                                        if (teacher) {
                                            reset(editedTeacher);
                                            props.setResult(true);
                                        } else {
                                            props.setResult(false);
                                        }
                                    })
                                    .catch((error) => props.setResult(false));
                            }
                        })
                }})};
    return (
        <Box width={1 / 4}>
            <form
                className={props.classes.form}
                // noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="firstName"
                    as={
                        <TextField
                            fullWidth
                            id="firstName"
                            label="Imię"
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName && errors.firstName.message}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'To pole jest wymagane'
                        },
                        validate: {
                            value: (value: string) => validateFirstName(value) || 'Zbyt krótkie imię'
                        }
                    }}
                />
                <Controller
                    name="lastName"
                    as={
                        <TextField
                            fullWidth
                            id="lastName"
                            label="Nazwisko"
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName && errors.lastName.message}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'To pole jest wymagane'
                        }
                    }}
                />
                <Controller
                    name="age"
                    as={
                        <TextField
                            fullWidth
                            id="age"
                            label="Wiek"
                            error={errors.age ? true : false}
                            helperText={errors.age && errors.age.message}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'To pole jest wymagane'
                        },
                        validate: {
                            value: (value: number) => validateAge(value) || 'Za młody'
                        }
                    }}
                />
                <Controller
                    name="email"
                    as={
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email.message}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'To pole jest wymagane'
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Nieprawidłowy adres e-mail'
                        }
                    }}
                />
                <Controller
                    name="course"
                    as={
                        <TextField
                            fullWidth
                            id="course"
                            label="Przedmiot"
                            error={errors.course ? true : false}
                            helperText={errors.course && errors.course.message}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'To pole jest wymagane'
                        }
                    }}
                />
                <div style={{ marginTop: 10 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                    >
                        Zapisz
                    </Button>
                </div>
            </form>
        </Box>
    );
}