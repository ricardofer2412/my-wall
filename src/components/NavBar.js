
import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core'
import firebase from './firebase'

const styles = {
  classes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
function NavBar({ user }) {
  const history = useHistory();

  function onLogOut() {
    firebase.auth().signOut();
    history.push("/Login");
  }

  function onLogIn() {
    history.push("/");
  }

  console.log(user)
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" style={styles.classes} color="inherit" aria-label="menu">

        </IconButton>
        <Typography variant="h6" style={styles.classes}>
          Silver Logic Wall
        </Typography>
        {user ? (
          <Button id="log_out_button" onClick={onLogOut} color="inherit">
            Log Out
          </Button>
        ) : (
            <Button id="login_button" onClick={onLogIn} color="inherit">
              Login
            </Button>
          )}
      </Toolbar>
    </AppBar>
  )
}


export default NavBar