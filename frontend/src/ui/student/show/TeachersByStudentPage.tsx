import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useContext } from 'react';
import TeachersByStudent from './TeachersByStudent';
import { ThemeContext } from '../../theme-context';
import {useParams} from "react-router-dom";

export default function StudentsPage() {
    const context = useContext(ThemeContext);
    const params: any = useParams();
    const studentId: number = params.studentId;

    return (
        <Container maxWidth="lg" className={context.classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={context.classes.paper}>
                        <TeachersByStudent classes={context.classes} studentId={studentId} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}