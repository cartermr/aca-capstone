import { Grid, Paper, Button, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
    },
    box: {
        alignSelf: 'center',
        backgroundColor: '#3f51b5',
        color: 'white',
        height: '5rem',
        width: '20rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

{/* <Paper className={classes.paper}>
<Button className={classes.button} variant='contained' color='primary'>
    Public
</Button>
<Button className={classes.button} variant='contained' color='primary'>
    Agency
</Button>
</Paper> */}

const Portal = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <Grid item md={8}>
                <Paper className={classes.paper}>
                    <Typography align='center' variant='h4'>
                        Welcome to the Non-Verbal Identification System
                    </Typography>
                    <Typography align='center' variant='body1'>
                        If you are a member of the public and would like to create an account and register a person, please click on the Public link below.
                    </Typography>
                    <Typography align='center' variant='body1'>
                        If you are a member of an agency using this system, please click on the Agency link below
                    </Typography>
                    <Box className={classes.box}>
                        <Typography variant='h4'>
                            Public
                        </Typography>
                    </Box>
                    <Box className={classes.box}>
                        <Typography variant='h4'>
                            Agency
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portal