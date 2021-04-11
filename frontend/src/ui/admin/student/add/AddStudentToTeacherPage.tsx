import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../theme-context';
import AddStudentToTeacherForm from './AddStudentToTeacherForm';
import Title from '../../../Title';

export default function AddStudentToTeacherPage() {
    const context = useContext(ThemeContext);

    const [result, setResult] = useState<boolean | null>(null);

    return (
        <Container maxWidth="lg" className={context.classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={context.classes.paper}>
                        <Title>Przydzielanie studenta do nauczyciela</Title>
                        <div style={{ marginBottom: 10 }}>
                            {result !== null && result === true && <Alert severity="success">Student został przydzielony do nauczyciela.</Alert>}
                            {result !== null && result === false && <Alert severity="error">Nieprawidłowe dane.</Alert>}
                        </div>
                        <AddStudentToTeacherForm classes={context.classes} setResult={setResult} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}