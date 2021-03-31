import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = () => {
    const logout = () => {
        fetch('/api/logout').then(res => {
            sessionStorage.clear()
            window.location.replace('/')
        })
    }
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant='h6'>
                        NVIS System
                    </Typography>
                    <Button onClick={logout} color='inherit'>LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header