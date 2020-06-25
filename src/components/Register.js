import React, { useCallBack } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from './firebase'

const Register = ({ history }) => {
  const handleSignUp = useCallBack(async event => {
    event.preventDefault();
    const { email, password } = event.target.element;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push('/')
    } catch (error) {
      alert(error);
    }
  }, [history])

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <label>
          email
        </label>
        <input name='email' type='email' placeholder='email' />
        <label>
          password
        </label>
        <input name='password' type='password' placeholder='password' />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default withRouter(Register)