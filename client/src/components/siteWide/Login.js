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
import { useHistory } from 'react-router'

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
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(2)
    },
}));

// Login component
const Login = () => {
  const history = useHistory()
  // Object to access defined style for the Material UI coponents
  const classes = useStyles();

  // Local state to stor the user credentials for login
  const [login, setLogin] = useState({'username': '', 'password': ''})
  const [error, setError] = useState(false)
  const errorMsg = "Username or Password is Incorrect"

  // Keeps track of values entered into textfields, sets user state
  const handleInput = (e) => {
    let key = e.target.name
    let value = e.target.value
    let params = login
    params[key] = value
    setLogin({...params})
    // console.log(newUser)
  }

  // Perform the actual login, call out to API
  const loginUser = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    // console.log(res)
    const data = res.ok ? await res.json() : false
    // console.log(data)
    if (!data) {
      setError(true)
      return
    } else {
      sessionStorage.setItem('user', JSON.stringify(data))
      console.log(data)
      data.role === 'search' ? history.push('/internal/search') : history.push('/public/dashboard')
      // history.push('/internal/search')
    }
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
          Agency Sign In
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            value={login.username}
            onChange={handleInput}
            error={error}
            helperText={error ? errorMsg : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={login.password}
            onChange={handleInput}
            error={error}
            helperText={error ? errorMsg : ''}
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
          <Button
            type="click"
            onClick={() => history.push('/')}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Home
          </Button>
          <Button
            type="click"
            onClick={() => history.push('/internal/newuser')}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default Login