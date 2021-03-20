import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom'
import { useState } from 'react'

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

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({})

  const handleInput = (e) => {
    let key = e.target.name
    let value = e.target.value
    let params = user
    params[key] = value
    setUser(params)
    // console.log(newUser)
}

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
      .then(ok => ok ? history.push('/search') : window.alert('Login Failed'))
  };

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