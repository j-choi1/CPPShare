import React from 'react';
import { Container, Grid, makeStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    grid: {
        paddingTop: theme.spacing(4)
    },
    gridItem: {
        textAlign: 'center',
        paddingBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const Home: React.FC = () => {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        setAge(event.target.value);
    };

    return (
        <Grid container spacing={3} className={classes.grid} justify="center">
            <Grid item xs={6} className={classes.gridItem}>
                <FormControl fullWidth>
                    <InputLabel id="course-label">Course</InputLabel>
                    <Select
                        labelId="course-label"
                        id="course"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Some Item'}>Some Items</MenuItem>
                    </Select>
                    <FormHelperText>Please select a course.</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Home;
