import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    Button,
    Select,
    FormHelperText,
    MenuItem,
    Paper,
    TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    button: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    alert: {
        marginBottom: theme.spacing(2),
    },
}));

const Submit: React.FC = () => {
    const classes = useStyles();

    const [selectedCourse, setSelectedCourse] = useState('');
    const [file, setFile] = useState(new File([''], ''));
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [comment, setComment] = useState('');
    const [courses, setCourses] = useState([]);

    const handleCourseChange = (event: React.ChangeEvent<any>) => {
        setSelectedCourse(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<any>) => {
        setFile(event.target.files[0]);
    };

    const handleCommentChange = (event: React.ChangeEvent<any>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('course', selectedCourse);
        formData.append('file', file);
        formData.append('comment', comment);

        const res = await axios.post('/upload', formData);

        if (res.data.status === 'success') {
            setAlert({
                type: 'success',
                message: 'Textbook has been submitted!',
            });
        } else {
            setAlert({
                type: 'error',
                message: 'Error! Something went wrong.',
            });
        }

        setSelectedCourse('');
        setFile(new File([''], ''));
        setComment('');
    };

    useEffect(() => {
        const getCourses = async () => {
            const data = await (await fetch('/courses')).json();
            setCourses(data);
        };

        getCourses();
    }, []);

    return (
        <Grid container className={classes.grid} justify="center">
            <Grid item md={6}>
                <Paper variant="outlined" className={classes.paper}>
                    {alert.type === 'success' && (
                        <Alert severity="success" className={classes.alert}>
                            {alert.message}
                        </Alert>
                    )}

                    {alert.type === 'error' && (
                        <Alert severity="error" className={classes.alert}>
                            {alert.message}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel shrink id="course-label">
                                Course
                            </InputLabel>
                            <Select
                                value={selectedCourse}
                                onChange={handleCourseChange}
                            >
                                {courses.map(
                                    (course: { id: number; name: string }) => {
                                        return (
                                            <MenuItem
                                                key={course.id}
                                                value={course.id}
                                            >
                                                {course.name}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                            <FormHelperText>
                                Please select a course.
                            </FormHelperText>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="File"
                            value={file.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            className={classes.textField}
                        />

                        <TextField
                            fullWidth
                            label="Comments (Optional)"
                            className={classes.textField}
                            onChange={handleCommentChange}
                            value={comment}
                        />

                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <input
                                    accept="application/pdf"
                                    className={classes.input}
                                    id="input-file"
                                    type="file"
                                    onChange={handleInputChange}
                                />

                                <label htmlFor="input-file">
                                    <Button
                                        fullWidth
                                        component="span"
                                        variant="contained"
                                        className={classes.button}
                                    >
                                        Select File
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item sm={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Submit;
