import { Button, Container, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
    container: {
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '20px'
    },
    button: {
        width: '20rem',
        alignSelf: 'center'
    }
}))

const Portal = () => {
    const classes = useStyles()
    return (
        <Container className={classes.container} maxWidth='sm'>
            <Paper className={classes.paper}>
                <Button className={classes.button} variant='contained' color='primary'>
                    Public
                </Button>
                <Button className={classes.button} variant='contained' color='primary'>
                    Agency
                </Button>
            </Paper>
        </Container>
    )
}

export default Portal