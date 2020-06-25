import React from 'react';
import Wall from './components/Wall'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register'
import {AuthProvider}  from "./components/services/Auth";
import PrivateRoute from "./components/services/PrivateRoutes";


const App = () => {
  return (
   
<AuthProvider>
    <Router>
    <Route  path="/" component={NavBar} />
    <PrivateRoute exact path="/"  component={NavBar} />
      <Route exact path="/" component={Wall} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
    </Router>
  </AuthProvider>
    
  );
}

export default App;
