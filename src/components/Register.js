import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import firebase from './firebase'
import Container from '@material-ui/core/Container';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
        SilverLogic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const classes = {
  paper: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {


  },
  form: {
    width: '100%',

  },
  submit: {

  },
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.accountRef = firebase.firestore().collection('accounts')

    this.state = {
      email: '',
      password: '',
      name: '',
      errorMessage: ''
    }
  }

  signUp = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        const { uid } = res.user;
        console.log(uid)
        this.accountRef.doc(uid).set({
          userId: uid,
          name: this.state.name,
          email: this.state.email
        })
        this.props.history.push("/")

      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
        this.setState({
          errorMessage: error.message
        })
      });


  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
      </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"

              autoFocus
              onChange={this.onChange}
              value={this.state.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
              value={this.state.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
              value={this.state.password}
            />
            {this.state.errorMessage && (
              <Typography style={{ color: 'red' }}>{this.state.errorMessage}</Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signUp}
            >
              Sign Up
        </Button>
            <Link href="./login">Already have an account?</Link>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>

              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  }

};


export default Register;