import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles( theme => ( {
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  } ) );

const NewUser = () => {
  const [newUser, setNewUser] = useState({})
  const [passError, setPassError] = useState( {
    isValid: true,
    isSame: true,
    validMsg: "Password Doesn't meet complexity requirements",
    sameMsg: "Passwords must match"
  } )
  const history = useHistory();
  const classes = useStyles();

  const handleInput = (e) => {
    let key = e.target.name
    let value = e.target.value
    let params = newUser
    params[key] = value
    setNewUser(params)
    console.log(newUser)
}

const passValidation = () => {
  
}

  const createUser = (e) => {
    e.preventDefault()
    // let user = newUser
    // delete user.verify_password
    // fetch("/api/newuser", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(user)
    // })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Account
        </Typography>
        <form className={classes.form}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoFocus
            onChange={handleInput}
            value={newUser.first_name}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            onChange={handleInput}
            value={newUser.last_name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={handleInput}
            value={newUser.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInput}
            value={newUser.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="verify_password"
            label="Verify Password"
            type="verify_password"
            id="verify_password"
            onChange={handleInput}
            value={newUser.verify_password}
          />
          <Button
            type="click"
            onClick={createUser}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default NewUser