import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom'

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

const NewUser = () => {
  const history = useHistory();
  const classes = useStyles();

  const createUser = () => {
    fetch("/api/login", { method: "POST" })
      .then( res => res.ok)
      .then(ok => ok ? history.push('/search') : window.alert('Login Failed'))
  };

return (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Create New Account
      </Typography>
      <div className={classes.form}>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="first_name"
          label="First Name"
          name="first_name"
          autoFocus
          // onChange={}
        />
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="last_name"
          label="Last Name"
          name="last_name"
          autoFocus
          // onChange={}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          name="email"
          autoFocus
          // onChange={}
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
          // onChange={}
        />
         <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Verify Password"
          type="password"
          id="password"
          // onChange={}
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
      </div>
    </div>
  </Container>
);
}

export default NewUser