import React, { useEffect, useState, Fragment, useRef } from 'react';
import {
  Card,
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Button,
  Select,
  FormHelperText,
  MenuItem,
  CardContent,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  gridItem: {
    textAlign: 'center',
  },
  card: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const selectedCourseName = useRef('');

  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [files, setFiles] = useState([]);

  const handleChange = async (event: React.ChangeEvent<any>) => {
    const selected = event.target.value;

    setSelectedCourse(selected);
    selectedCourseName.current = event.currentTarget.textContent;

    const data = await (await fetch(`/courses/${selected}/files`)).json();
    setFiles(data);
  };

  useEffect(() => {
    const getCourses = async () => {
      const data = await (await fetch('/courses')).json();
      setCourses(data);
    };

    getCourses();
  }, []);

  return (
    <Fragment>
      <Grid container className={classes.grid} justify="center">
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel shrink id="course-label">
              Course
            </InputLabel>
            <Select value={selectedCourse} onChange={handleChange}>
              {courses.map((course: { id: number; name: string }) => {
                return (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Please select a course.</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container className={classes.grid} justify="center">
        {selectedCourse && files.length === 0 && (
          <Grid item md={6} className={classes.gridItem}>
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                <p>
                  No textbooks found for{' '}
                  <strong>{selectedCourseName.current}</strong>.
                </p>
              </CardContent>
            </Card>
          </Grid>
        )}

        {selectedCourse && files.length > 0 && (
          <Fragment>
            {files.map(
              (file: {
                id: number;
                filename: string;
                comment: string;
                upload_date: string;
              }) => {
                return (
                  <Fragment>
                    <Grid item md={6} className={classes.gridItem}>
                      <Card variant="outlined" className={classes.card}>
                        <CardContent>
                          <p>
                            <strong>Date Submitted</strong>:{' '}
                            {moment(file.upload_date).format('MM/DD/YYYY')}
                          </p>
                          <p>
                            <strong>Comment</strong>: {file.comment}
                          </p>

                          <Button
                            variant="outlined"
                            color="primary"
                            href={`http://localhost:4000/files/${file.id}/download`}
                            className={classes.button}
                          >
                            Download Textbook
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid
                      item
                      md={12}
                      implementation="css"
                      smDown
                      component={Hidden}
                    />
                  </Fragment>
                );
              }
            )}
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

export default Home;
