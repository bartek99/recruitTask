import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as student from '../../../core/student';

interface AddStudentFormProps {
    classes: any;
    setResult: (result: boolean | null) => void;
}

export function validateAge(value: number): boolean {
    if (value <= 18) {
        return false;
    }
    return true;
}

export function validateFirstName(value: string): boolean {
    if (value.length<=2) {
        return false;
    }
    return true;
}

export default function AddStudentFormPage(props: AddStudentFormProps) {
    const { register, handleSubmit, errors, setError, reset } = useForm();
    const onSubmit = (newStudent: student.NewStudent) => {
        props.setResult(null);
        student.studentExists(newStudent.email)
            .then((result) => {
                if (result === true) {
                    setError('email', { message: 'Użytkownik o tym adresie e-mail już istnieje' })
                } else {
                    student.teacherExists(newStudent.email)
                        .then((result2) => {
                            if(result2===true){
                                setError('email', {message: 'Użytkownik o tym adresie e-mail juz istenieje'})
                            }else{
                                student.addStudent(newStudent)
                                    .then((result) => {
                                        props.setResult(true);
                                        reset();
                                    })
                                    .catch((error) => props.setResult(false));
                            }
                        })
                }
            })
    }

    return (
        <Box width={1 / 4}>
            <form
                className={props.classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="Imię"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'To pole jest wymagane'
                            },
                            validate: {
                                value: (value: string) => validateFirstName(value) || 'Zbyt krótkie imię'
                            }
                        })}
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName && errors.firstName.message}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Nazwisko"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'To pole jest wymagane'
                            }
                        })}
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName && errors.lastName.message}
                    />
                    <TextField
                        fullWidth
                        id="age"
                        name="age"
                        label="Wiek"
                        type="number"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'To pole jest wymagane'
                            },
                            validate: {
                                value: (value: number) => validateAge(value) || 'Za młody'
                            }
                        })}
                        error={errors.age ? true : false}
                        helperText={errors.age && errors.age.message}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Adres e-mail"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'To pole jest wymagane'
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Nieprawidłowy adres e-mail'
                            }
                        })}
                        error={errors.email ? true : false}
                        helperText={errors.email && errors.email.message}
                    />
                    <TextField
                        fullWidth
                        id="subject"
                        name="subject"
                        label="Kierunek"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'To pole jest wymagane'
                            }
                        })}
                        error={errors.subject ? true : false}
                        helperText={errors.subject && errors.subject.message}
                    />
                </Box>

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