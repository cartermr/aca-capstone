import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext'
import Search from '../components/search/Search'

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

const Home = (props) => {
  const {setComponentDisplayed} = useContext(SearchContext)
    const classes = useStyles()

    const route = () => {
      setComponentDisplayed(<Search />)
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoFocus
              onChange={(e) => props.input(e)}
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
              onChange={(e) => props.input(e)}
            />
            <Button
              type="click"
              onClick={route}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Container>
    );
}

export default Home