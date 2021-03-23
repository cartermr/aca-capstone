// Material UI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Module import
import { useState } from 'react'

// Styles for Material UI components
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

// Login component
const Login = () => {
  // Object to access defined style for the Material UI coponents
  const classes = useStyles();

  // Local state to stor the user credentials for login
  const [user, setUser] = useState({})

  // Keeps track of values entered into textfields, sets user state
  const handleInput = (e) => {
    let key = e.target.name
    let value = e.target.value
    let params = user
    params[key] = value
    setUser(params)
    // console.log(newUser)
  }

  // Perform the actual login, call out to API
  const loginUser = (e) => {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then( res => res.ok)
      .then(ok => ok ? window.location.replace('/search') : window.alert('Login Failed'))
  };

// JSX return of login page
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleInput}
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
          />
          <Button
            type="click"
            onClick={loginUser}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default Login