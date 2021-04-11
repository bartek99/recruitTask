import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useContext } from 'react';
import StudentsByTeacher from './StudentsByTeacher';
import { ThemeContext } from '../../../theme-context';
import {useParams} from "react-router-dom";

export default function StudentsPage() {
    const context = useContext(ThemeContext);
    const params: any = useParams();
    const teacherId: number = params.teacherId;

    return (
        <Container maxWidth="lg" className={context.classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={context.classes.paper}>
                        <StudentsByTeacher classes={context.classes} teacherId={teacherId} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}