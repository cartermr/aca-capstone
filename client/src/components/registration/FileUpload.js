import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem'
import { Input } from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
    headers: {
        marginTop: theme.spacing(2)
    }
}))

const FileUpload = (props) => {
    const reset = () => {
        window.location.reload()
    }

    const classes = useStyles()
    return (
        <Container component='main'>
            <CssBaseline />
            <Typography className={classes.headers} align='center' component='h1' variant='h4'>
                REGISTER PERSON
            </Typography>
            <Typography className={classes.headers} component='h2' variant='h6'>
                Please Upload a Photo
            </Typography>
            <form className={classes.headers} onSubmit={(e) => {props.register(e)}} id='photoUpload' encType='multipart/form-data'>
                <Grid container>
                    <Grid item>
                        <input type='file' />
                    </Grid>
                </Grid>
                <Grid className={classes.headers} container spacing={2}>
                    <Grid item>
                        <Button type='submit' variant='contained' color='primary'>REGISTER</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={reset} variant='contained' color='primary'>RESET</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default FileUpload