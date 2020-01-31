import React from 'react';
import { Paper, Tabs, Tab, makeStyles, Grid } from '@material-ui/core';
import Image from './Image';
import Logo from '../assets/logo.png';

const useStyles = makeStyles({
    logo: {
        maxWidth: 600
    }
});

const Header: React.FC = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Image src={Logo} className={classes.logo} alt="logo" />
            </Grid>

            <Grid item xs={6}>
                <Paper variant="outlined">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Home" />
                        <Tab label="Submit Textbook" />
                    </Tabs>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Header;
