import { useEffect } from "react";

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

const Results= ({searchResults}) => {

  useEffect(() => {
    console.log(searchResults)
  })

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
          {searchResults.map((person, index) => (
            <Grid item key={index}>
              <img src={`https://storage.googleapis.com/nvissystem/${person.picture_filename}`} alt={person.first_name}/>
            </Grid>
          ))}
        </Grid>
        <hr />
        <Grid container spacing={2}>
          <Grid item>
            <Button href='/search' variant="contained" color="primary">
              NEW SEARCH
            </Button>
          </Grid>
          <Grid item>
            <Button href='/' variant="contained" color="primary">
              HOME
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
}

export default Results