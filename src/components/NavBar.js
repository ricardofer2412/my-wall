import React from 'react'
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core'
import firebase from './firebase'

const styles = {
  classes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
class NavBar extends React.Component {



  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" style={styles.classes} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6" style={styles.classes}>
            Silver Logic Wall
        </Typography>
          <Button color="inherit" style={styles.classes}>Login</Button>
          <Button onClick={() => firebase.auth().signOut()}>SingOut</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar