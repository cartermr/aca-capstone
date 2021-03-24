import { Grid, Paper, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
    root: {
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItemTop: {
    },
    paper: {
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    box: {
        alignSelf: 'center',
        backgroundColor: '#3f51b5',
        color: 'white',
        width: '200px',
        textAlign: 'center'
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
            <Grid item md={5} className={classes.gridItemTop}>
                <Paper className={classes.paper}>
                    <Box className={classes.box}>
                        Public
                    </Box>
                    <Box className={classes.box}>
                        Agency
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Portal