import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles( (theme) => ({
    headers: {
        marginTop: theme.spacing(2)
    }
}))

const Search = (props) => {
    const reset = () => {
        window.location.reload()
    }

    const classes = useStyles()
    return (
        <Container component='main'>
            <CssBaseline />
            <Typography className={classes.headers} align='center' component='h1' variant='h4'>
                SEARCH
            </Typography>
            <hr />
            <form>
                <Typography className={classes.headers} component='h2' variant='h6'>
                    Demographic Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='first_name' label='First Name' />
                    </Grid>
                    <Grid item>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='last_name' label='Last Name' />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField select variant='outlined' onChange={(e) => {props.onChange(e)}} name='race' value='race' fullWidth={true} >
                            <MenuItem value='race'>Race</MenuItem>
                            <MenuItem value='White'>White</MenuItem>
                            <MenuItem value='Black'>Black</MenuItem>
                            <MenuItem value='Hispanic'>Hispanic</MenuItem>
                            <MenuItem value='Asian'>Asian</MenuItem>
                            <MenuItem value='Indian'>Indian</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField select variant='outlined' onChange={(e) => {props.onChange(e)}} name='sex' value='sex' fullWidth={true}>
                            <MenuItem value='sex'>Sex</MenuItem>
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Typography className={classes.headers} component='h2' variant='h6'>
                    Physical Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='age' label='Age' fullWidth={true} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='height_feet' label='Height Feet' fullWidth={true} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='height_inches' label='Height Inches' fullWidth={true} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='weight' label='Weight' fullWidth={true} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField select variant='outlined' onChange={(e) => {props.onChange(e)}} name='hair_color' value='hair color' fullWidth={true}>
                            <MenuItem value='hair color'>Hair Color</MenuItem>
                            <MenuItem value='Brown'>Brown</MenuItem>
                            <MenuItem value='Blonde'>Blonde</MenuItem>
                            <MenuItem value='Black'>Black</MenuItem>
                            <MenuItem value='Red'>Red</MenuItem>
                            <MenuItem value='Gray'>Gray</MenuItem>
                            <MenuItem value='White'>White</MenuItem>
                            <MenuItem value='Salt_Pepper'>Salt and Pepper</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField select variant='outlined' onChange={(e) => {props.onChange(e)}} name='eye_color' value='eye color' fullWidth={true}>
                            <MenuItem value='eye color'>Eye Color</MenuItem>
                            <MenuItem value='Brown'>Brown</MenuItem>
                            <MenuItem value='Blue'>Blue</MenuItem>
                            <MenuItem value='Hazel'>Hazel</MenuItem>
                            <MenuItem value='Green'>Green</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Typography className={classes.headers} component='h2' variant='h6'>
                    Address Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='street' label='Street' fullWidth={true} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='apartment_number' label='Apt Number' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='city' label='City' />
                    </Grid>
                    <Grid item>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='state' label='State' />
                    </Grid>
                    <Grid item>
                        <TextField variant='outlined' onChange={(e) => {props.onChange(e)}} name='zip' label='Zip' />
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                    <Grid item>
                        <Button onClick={() => props.performSearch()} variant='contained' color='primary'>SEARCH</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={reset} variant='contained' color='primary'>RESET</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Search