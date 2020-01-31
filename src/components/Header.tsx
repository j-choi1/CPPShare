import React, { Fragment } from 'react';
import { Paper, Tabs, Tab, makeStyles, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Image from './Image';
import Logo from '../assets/logo.png';
import Home from '../pages/Home';
import Submit from '../pages/Submit';

const useStyles = makeStyles({
    logo: {
        width: '100%',
        maxWidth: 600
    }
});

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <Router>
            <Route
                path="/"
                render={({ location }) => (
                    <Fragment>
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Link to="/">
                                    <Image
                                        src={Logo}
                                        className={classes.logo}
                                        alt="logo"
                                    />
                                </Link >
                            </Grid>

                            <Grid item xs={6}>
                                <Paper variant="outlined">
                                    <Tabs
                                        value={location.pathname}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        centered
                                    >
                                        <Tab
                                            label="Home"
                                            component={Link}
                                            value="/"
                                            to="/"
                                        />
                                        <Tab
                                            label="Submit Textbook"
                                            component={Link}
                                            value="/submit"
                                            to="/submit"
                                        />
                                    </Tabs>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/submit" component={Submit} />
                        </Switch>
                    </Fragment>
                )}
            />
        </Router>
    );
};

export default Header;
