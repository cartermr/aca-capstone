import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from "@material-ui/core";

import EditModal from './EditModal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: '240px',
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    marginTop: theme.spacing(1)
  },
  name: {
    flexGrow: 1
  }
}));
const Dashboard = () => {
  const history = useHistory()
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [registeredPeople, setRegisteredPeople] = useState([])
  const [person, setPerson] = useState({})

  useEffect(() => {
    fetch('/api/getregistered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: JSON.parse(sessionStorage.getItem('user')).username})
    }).then(res => res.json())
      .then(data => setRegisteredPeople(data))
  }, [])

  const editPerson = (per) => {
    setPerson(per)
    setOpen(true)
    console.log(per)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
      >
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem onClick={() => history.push('/public/registration')} button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Person" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {registeredPeople.map( (person, index) => {
                  return (
                    <Paper key={index} className={classes.paper}>
                      <Typography className={classes.name} variant="h5">{`${person.first_name} ${person.last_name}`}</Typography>
                      <IconButton onClick={() => editPerson(person)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  )
                })}
              </Grid>
            </Grid>
          </Container>
      </main>
      <EditModal open={open} setOpen={setOpen} person={person} />
    </div>
  );
}

export default Dashboard
