
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core'
import firebase from './firebase'

const styles = {
  classes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authButton: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
}
function NavBar({ user }) {
  let history = useHistory();

  function onLogOut() {
    firebase.auth().signOut()
    console.log('user logged out!')
    history.push("/")

  }

  function onLogIn() {
    history.push("/login");
  }


  if (user) {
    console.log('user logged in')
  } else {
    console.log('No user logged in')
  }
  return (
    <AppBar position="static"  >
      <Toolbar style={styles.classes}>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">

        </IconButton> */}
        <Typography variant="h6">
          Silver Logic Wall
        </Typography>
        {!user ? (
          <Button style={styles.authButton} id="login_button" onClick={onLogIn} color="inherit">
            Login
          </Button>

        ) : (
            <Button id="log_out_button" onClick={onLogOut} color="inherit">
              Log Out
            </Button>
          )}
      </Toolbar>
    </AppBar>
  )
}


export default withRouter(NavBar)