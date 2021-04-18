import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles( theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        height: '30rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(5),
        padding: theme.spacing(1)
    },
    link: {
        alignSelf: 'center',
        backgroundColor: '#3f51b5',
        color: 'white',
        height: '5rem',
        width: '20rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'transform 0.25s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
}))

const Portal = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <Grid item md={8}>
                <Paper className={classes.paper}>
                    <Typography align='center' variant='h4'>
                        Welcome to the Non-Verbal Identification System
                    </Typography>
                    <Typography align='center' variant='h5'>
                        Please login to use the system
                    </Typography>
                    <Typography align='center' variant='body1'>
                        If you are a member of the public and would like to register a person, please create an account
                    </Typography>
                    <Link to='/login' className={classes.link}>
                        <Typography variant='h4'>
                            Login
                        </Typography>
                    </Link>
                    <Link to='/public/newuser' className={classes.link}>
                        <Typography variant='h4'>
                            Create Account
                        </Typography>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portal