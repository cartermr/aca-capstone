import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
    headers: {
        marginTop: theme.spacing(2)}
}))

const SearchResults= () => {

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const classes = useStyles()

    return (
      <Container component="main">
        <CssBaseline />
        <Typography
          className={classes.headers}
          align="center"
          component="h1"
          variant="h4"
        >
          SEARCH RESULTS
        </Typography>
        <hr />
        <Grid container justify="center" spacing={4}>
          {cards.map((card) => (
            <Grid item key={card}>
              <img src="http://via.placeholder.com/150" />
            </Grid>
          ))}
        </Grid>
        <hr />
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary">
              NEW SEARCH
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              MODIFY SEARCH
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              HOME
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
}

export default SearchResults