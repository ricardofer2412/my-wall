import React from 'react';
import Wall from './components/Wall'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register'
import UserProvider from "./components/services/Auth";



function App(user) {
  console.log(user)
  return (

    <UserProvider>
      <Router>
        <Route path="/" render={() => <NavBar user={user} />} />
        <Route exact path="/" render={() => <Wall user={user} />} />
        {/* {!user && ( */}
        <React.Fragment>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/register" component={Register} />
        </React.Fragment>
        {/* )} */}
      </Router>
    </UserProvider>

  );
}

export default App;
