
import React, { useCallBack, useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import firebase from './firebase'
import { AuthContext } from './services/Auth'

const Login = ({ history }) => {
  const handleLogin = useCallBack(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.psuh('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]

  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          email
          </label>
        <input name='email' type='email' placeholder='email' />
        <label>
          password
          </label>
        <input name='password' type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
