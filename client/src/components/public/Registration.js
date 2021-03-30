import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";

import { useState, useRef } from "react";
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  headers: {
    marginTop: theme.spacing(2),
  },
}));

const Register = (props) => {
  const history = useHistory()
  // control the input values, create searchParameters object
  const [registerParameters, setRegisterParameters] = useState( {
      first_name: "",
      last_name: "",
      dob: "",
      race: "",
      sex: "",
      height_feet: "",
      height_inches: "",
      weight: "",
      hair_color: "",
      eye_color: "",
      street: "",
      apartment_number: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      emergency_name: "",
      emergency_address: "",
      emergency_phone: "",
      emergency_relationship: ""
  } );

  const [isblank, setIsBlank] = useState( {
      blankMsg: "Must not be Blank",
      first_name: false,
      last_name: false,
      dob: false,
      race: false,
      sex: false,
      height_feet: false,
      height_inches: false,
      weight: false,
      hair_color: false,
      eye_color: false,
      street: false,
      apartment_number: false,
      city: false,
      state: false,
      zip: false,
      phone: false,
      emergency_name: false,
      emergency_address: false,
      emergency_phone: false,
      emergency_relationship: false
    } );






  const handleInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    let params = registerParameters;
    let blank = isblank;

    blank[key] = false;
    params[key] = value;

    setIsBlank({ ...isblank, blank });
    setRegisterParameters(params);

    console.log(registerParameters)
  };

  const form = useRef(null);
  const registerPerson = (e) => {
    e.preventDefault();

    if (!checkBlanks()) {
      return;
    }

    const data = new FormData(form.current);

    fetch("/api/register", {
      method: "POST",
      body: data,
    }).then((res) => res.json());
    window.location.reload();
  };

  const reset = () => {
    let restore = registerParameters
    Object.keys(registerParameters).forEach(key => {
      restore[key] = ''
    })
    setRegisterParameters({...restore})
  };

  // CHECK FOR BLANK FIELDS
  const checkBlanks = () => {
    let blank = isblank;
    let valid = true;
    Object.keys(isblank).forEach((key) => {
        if (key === 'blankMsg') {
            return
        }
        
      if (registerParameters[key] === "") {
        blank[key] = true;
        setIsBlank({ ...isblank, blank });
        valid = false;
      }
    });
    return valid;
  };

  const classes = useStyles();
  return (
    <Container component="main">
      <CssBaseline />
      <Typography
        className={classes.headers}
        align="center"
        component="h1"
        variant="h4"
      >
        REGISTER PERSON
      </Typography>
      <hr />
      <Typography className={classes.headers} component="h2" variant="h6">
        Demographic Info
      </Typography>
      <form ref={form} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.first_name}
              name="first_name"
              label="First Name"
              error={isblank.first_name}
              helperText={isblank.first_name ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.last_name}
              name="last_name"
              label="Last Name"
              error={isblank.last_name}
              helperText={isblank.last_name ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.dob}
              name="dob"
              label="Date of Birth"
              error={isblank.dob}
              helperText={isblank.dob ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              select
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.race}
              name="race"
              label="Race"
              fullWidth={true}
              error={isblank.race}
              helperText={isblank.race ? isblank.blankMsg : ''}
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
              value={registerParameters.sex}
              name="sex"
              label="Sex"
              fullWidth={true}
              error={isblank.sex}
              helperText={isblank.sex ? isblank.blankMsg : ''}
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
              value={registerParameters.height_feet}
              name="height_feet"
              label="Height Feet"
              fullWidth={true}
              error={isblank.height_feet}
              helperText={isblank.height_feet ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.height_inches}
              name="height_inches"
              label="Height Inches"
              fullWidth={true}
              error={isblank.height_inches}
              helperText={isblank.height_inches ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.weight}
              name="weight"
              label="Weight"
              fullWidth={true}
              error={isblank.weight}
              helperText={isblank.weight ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              select
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.hair_color}
              name="hair_color"
              label="Hair Color"
              fullWidth={true}
              error={isblank.hair_color}
              helperText={isblank.hair_color ? isblank.blankMsg : ''}
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
              value={registerParameters.eye_color}
              name="eye_color"
              label="Eye Color"
              fullWidth={true}
              error={isblank.eye_color}
              helperText={isblank.eye_color ? isblank.blankMsg : ''}
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
              value={registerParameters.street}
              name="street"
              label="Street"
              fullWidth={true}
              error={isblank.street}
              helperText={isblank.street ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.apartment_number}
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
              value={registerParameters.city}
              name="city"
              label="City"
              error={isblank.city}
              helperText={isblank.city ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.state}
              name="state"
              label="State"
              error={isblank.state}
              helperText={isblank.state ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.zip}
              name="zip"
              label="Zip"
              error={isblank.zip}
              helperText={isblank.zip ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.phone}
              name="phone"
              label="Phone"
              error={isblank.phone}
              helperText={isblank.phone ? isblank.blankMsg : ''}
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
              value={registerParameters.emergency_name}
              name="emergency_name"
              label="Name"
              error={isblank.emergency_name}
              helperText={isblank.emergency_name ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.emergency_address}
              name="emergency_address"
              label="Address"
              fullWidth={true}
              error={isblank.emergency_address}
              helperText={isblank.emergency_address ? isblank.blankMsg : ''}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.emergency_phone}
              name="emergency_phone"
              label="Phone"
              error={isblank.emergency_phone}
              helperText={isblank.emergency_phone ? isblank.blankMsg : ''}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              onChange={handleInput}
              value={registerParameters.emergency_relationship}
              name="emergency_relationship"
              label="Relationship"
              error={isblank.emergency_relationship}
              helperText={isblank.emergency_relationship ? isblank.blankMsg : ''}
            />
          </Grid>
        </Grid>
        <Typography className={classes.headers} component="h2" variant="h6">
          Select Photo to Upload
        </Typography>
        <Grid container spacing={2}>
          <Grid item className={classes.headers}>
            <input name="photo" type="file" />
          </Grid>
        </Grid>
        <hr className={classes.headers} />
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={registerPerson} variant="contained" color="primary">
              REGISTER
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={reset} variant="contained" color="primary">
              RESET
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => history.push('/public/dashboard')} variant="contained" color="primary">
              HOME
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
