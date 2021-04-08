import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useState } from 'react'
import { useHistory } from 'react-router'

const useStyles = makeStyles( theme => ({
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
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
  }));

const NewAgencyUser = () => {
  const history = useHistory()
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    verify_password: ""
  })

  const [passError, setPassError] = useState( {
    notValid: false,
    notSame: false,
    validMsg: "",
    sameMsg: ""
  })

  const [isblank, setIsBlanks] = useState( {
    first_name: false,
    last_name: false,
    username: false,
    password: false,
    verify_password: false,
    blankMsg: "Must not be Blank"
  })

  const [notValidEmail, setNotValidEmail] = useState({
    notValid: false,
    msg: "Must be a valid email address"
  })

  const classes = useStyles();

  // CONTROL INPUT TO FORM FIELDS
  const handleInput = (e) => {
    let key = e.target.name
    let value = e.target.value
    
    let params = newUser
    let blank = isblank

    blank[key] = false
    params[key] = value

    setNewUser({...newUser, ...params})
    setIsBlanks({...isblank, ...blank})

    
    if ( key === 'password' || key === 'verify_password' ) {
      passValidation()
    }
}


// PASSWORD VALIDATION LOGIC
const passValidation = () => {
  setPassError({...passError, notValid: false, notSame: false, validMsg: "", sameMsg: ""})

  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newUser.password)) {
    setPassError({...passError, notValid: true, validMsg: "Must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 or more characters"})
    return false
  }

  if (newUser.verify_password && newUser.password !== newUser.verify_password) {
    setPassError({...passError, notSame: true, sameMsg: "Passwords Must Match"})
    return false
  }
  return true
}

// CHECK FOR BLANK FIELDS
const checkBlanks = () => {
  let blank = isblank
  let valid = true
  Object.keys(isblank).forEach( key => {
    if (key === 'blankMsg') {
      return
    }

    if (newUser[key] === "") {
      blank[key] = true
      setIsBlanks({...isblank, blank})
      valid = false
    }
  })
  return valid
}

const validEmail = () => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(newUser.username)) {
    return true
  } else {
    let test = notValidEmail
    test.notValid = true
    setNotValidEmail(test)
    return false
  }
}

// CALL API TO CREATE USER
  const createUser = (e) => {
    e.preventDefault()
    if (!checkBlanks() || !passValidation() || !validEmail()) {
      return
    }

    let user = newUser
    delete user.verify_password
    user.role = 'search'
    fetch("/api/newuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.ok ? history.push('/login') : window.location.reload())
  };


  // JSX RETURN
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
            error={isblank.first_name}
            helperText={isblank.first_name ? isblank.blankMsg : ''}
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
            error={isblank.last_name}
            helperText={isblank.first_name ? isblank.blankMsg : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email (this will be your username)"
            name="username"
            type='email'
            onChange={handleInput}
            value={newUser.username}
            error={isblank.username || notValidEmail.notValid}
            helperText={isblank.first_name || notValidEmail.notValid ? notValidEmail.msg || isblank.blankMsg : ''}
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
            error={passError.notValid || passError.notSame || isblank.password}
            helperText={passError.notValid || passError.notSame || isblank.password ? passError.validMsg || passError.sameMsg || isblank.blankMsg : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="verify_password"
            label="Verify Password"
            type="password"
            id="verify_password"
            onChange={handleInput}
            value={newUser.verify_password}
            error={passError.notSame || isblank.verify_password}
            helperText={passError.notSame || isblank.verify_password ? passError.sameMsg || isblank.blankMsg : ''}
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
          <Button
            type="click"
            onClick={() => history.push('/')}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Home
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default NewAgencyUser