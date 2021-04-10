import Modal from '@material-ui/core/Modal'
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        Width: '800px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

const EditModal = (props) => {
    const classes = useStyles()

    const [person, setPerson] = useState({})
    const [updates, setUpdates] = useState({})

    useEffect(() => {
        console.log(updates)
    }, [updates])

    useEffect(() => {
        if (Object.entries(props.person).length === 0) {
            return
        }
        let height = props.person.height.toString()
        let [feet, inches] = height.split('.')
        inches = parseInt(Number('.' + inches) * 12)

        let per = props.person
        per.height_feet = feet
        per.height_inches = inches

        setPerson(per)
    }, [props.person])

    const handleClose = () => {
        props.setOpen(false)
    }

    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value

        let params = person
        params[key] = value

        setPerson(params)
        console.log(person)
    }

    const update = () => {
        let orig = props.person
        let curr = person
        Object.keys(orig).forEach(key => {
            if (orig[key] != curr[key]) {
                let params = updates
                params[key] = person[key]
                console.log(params)
                setUpdates({...updates, ...params})
            }
        })
    }

    return (
        <Modal
            className={classes.root}
            open={props.open}
            onClose={handleClose}
        >
            <div className={classes.paper}>
            <CssBaseline />
            <Typography className={classes.headers} component="h2" variant="h6">
                Demographic Info
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                    variant="outlined"
                    onChange={handleInput}
                    defaultValue={person.first_name}
                    name="first_name"
                    label="First Name"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    variant="outlined"
                    onChange={handleInput}
                    defaultValue={person.last_name}
                    name="last_name"
                    label="Last Name"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    variant="outlined"
                    onChange={handleInput}
                    defaultValue={person.dob}
                    name="dob"
                    label="Date of Birth"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                    select
                    variant="outlined"
                    onChange={handleInput}
                    defaultValue={person.race}
                    name="race"
                    label="Race"
                    fullWidth={true}
                    >
                    <MenuItem value="White">White</MenuItem>
                    <MenuItem value="Black">Black</MenuItem>
                    <MenuItem value="Hispanic">Hispanic</MenuItem>
                    <MenuItem value="Asian">Asian</MenuItem>
                    <MenuItem value="Indian">Indian</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                    select
                    variant="outlined"
                    onChange={handleInput}
                    defaultValue={person.sex}
                    name="sex"
                    label="Sex"
                    fullWidth={true}
                    >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    </TextField>
                </Grid>
                </Grid>
                <Typography className={classes.headers} component="h2" variant="h6">
                Physical Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.height_feet}
                        name="height_feet"
                        label="Height Feet"
                        fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.height_inches}
                        name="height_inches"
                        label="Height Inches"
                        fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.weight}
                        name="weight"
                        label="Weight"
                        fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        select
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.hair_color}
                        name="hair_color"
                        label="Hair Color"
                        fullWidth={true}
                        >
                        <MenuItem value="Brown">Brown</MenuItem>
                        <MenuItem value="Blonde">Blonde</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Gray">Gray</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Salt_Pepper">Salt and Pepper</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        select
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.eye_color}
                        name="eye_color"
                        label="Eye Color"
                        fullWidth={true}
                        >
                        <MenuItem value="Brown">Brown</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Hazel">Hazel</MenuItem>
                        <MenuItem value="Green">Green</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Typography className={classes.headers} component="h2" variant="h6">
                Address Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.street}
                        name="street"
                        label="Street"
                        fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.apartment_number}
                        name="apartment_number"
                        label="Apt Number"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.city}
                        name="city"
                        label="City"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.state}
                        name="state"
                        label="State"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.zip}
                        name="zip"
                        label="Zip"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.phone}
                        name="phone"
                        label="Phone"
                        />
                    </Grid>
                </Grid>
                <Typography className={classes.headers} component="h2" variant="h6">
                Emergency Contact
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.emergency_name}
                        name="emergency_name"
                        label="Name"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.emergency_address}
                        name="emergency_address"
                        label="Address"
                        fullWidth={true}
                        />
                    </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.emergency_phone}
                        name="emergency_phone"
                        label="Phone"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        variant="outlined"
                        onChange={handleInput}
                        defaultValue={person.emergency_relationship}
                        name="emergency_relationship"
                        label="Relationship"
                        />
                    </Grid>
                </Grid>
                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={update}
                >Update</Button>
            </div>
        </Modal>
    )
}

export default EditModal