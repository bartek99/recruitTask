import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useContext } from 'react';
import Teachers from './Teachers';
import { ThemeContext } from '../../theme-context';

export default function TeachersPage() {
    const context = useContext(ThemeContext);
    return (
        <Container maxWidth="lg" className={context.classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={context.classes.paper}>
                        <Teachers classes={context.classes} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}