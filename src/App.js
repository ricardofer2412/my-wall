import React from 'react';
import Wall from './components/Wall'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register'

import firebase from './components/firebase'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener()

  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
      else {
        this.setState({ user: null })
      }
    })
  }
  render() {
    console.log(this.state.user)
    return (
      <Router>
        <Route path="/" render={() => <NavBar user={this.state.user} />} />
        <Route exact path="/" render={() => <Wall user={this.state.user} />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>

    )
  }
}
export default App

