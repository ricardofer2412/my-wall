import React from 'react'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import firebase from './firebase'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import { useHistory, withRouter } from "react-router-dom";


const uuid = require("uuid");
const classes = {

  postList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  card: {

    marginButton: 20,
    marginTop: 20,
    width: 500

  },
  dialogText: {
    width: 500,
    hight: 300
  },
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  userName: {
    color: 'blue'
  },
  postText: {
    fontSize: 25
  }

}

class Wall extends React.Component {
  constructor(props) {
    super(props)
    this.postRef = firebase.firestore().collection("posts")

    this.state = {
      postId: '',
      content: '',
      userId: '',
      key: '',
      postsList: [],
      user: '',
      open: false,
      currentUser: '',
      postedBy: '',
      postedById: ''
    }
  }


  // authListener() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user, currentUser: user.uid })
  //       console.log(" USER: " + this.state.currentUser)
  //     }
  //     else {
  //       this.setState({ user: null })
  //     }
  //   })
  // }

  componentDidMount() {
    // this.authListener()
    this.getPosts()
    this.currentUser()

  }
  currentUser = () => {

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        const userId = user.uid
        firebase.firestore().collection("accounts")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(doc.data().name)
              console.log(doc.data().userId)
              this.setState({
                postedBy: doc.data().name,
                currentUser: doc.data().userId
              })
            } else {
              console.log('Document does not exist')
            }
          })
      }
    })
  }



  getPosts() {
    const postsList = []
    this.postRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { content, postedBy } = doc.data()
        postsList.push(
          {
            key: doc.id,
            content,
            postedBy
          }
        )
      })
      this.setState({
        postsList
      })
    })
    return postsList

  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  addPost = (e) => {
    e.preventDefault()


    const newPostsList = [...this.state.postsList,
    { content: this.state.content, key: this.state.key, postedBy: this.state.postedBy, postedById: this.state.postedById }]
    const postId = uuid()
    this.postRef.doc(postId).set({
      content: this.state.content,
      postId: postId,
      postedBy: this.state.postedBy,
      date: Date.now(),
      postedById: this.state.currentUser
    })
      .then(res => {
        this.setState({
          postsList: newPostsList,
          content: '',
          postId: '',
          postedBy: '',
          postedById: ''
        })
      })
    this.handleClickClose()
    this.getPosts()
  }

  deletePost = (id) => {

    this.postRef.doc(id).delete().then(() => {
      this.getPosts()
    })
      .catch((error) => {
        console.log('Error removing document: ', error)
      })
    // Delete from state
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClickClose = () => {
    this.setState({
      open: false, content: '',
    })
  }
  disabledPost = () => {
    alert("Need to Login to post")
  }



  render() {
    const { user } = this.props

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <TextField
              style={classes.dialogText}
              autoFocus
              InputProps={{ name: 'content' }}
              onChange={this.onChange}
              value={this.state.content}
              multiline
              rows={4}
              margin="dense"
              id="name"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.addPost} color="primary" type='submit'>
              Add
          </Button>
          </DialogActions>
        </Dialog>
        <Container style={classes.button}>
          {user ? (
            <Fab onClick={this.handleClickOpen} style={classes.button} color='primary' aria-label=" add">
              <Add />
            </Fab>
          ) : (
              <Fab onClick={this.disabledPost} style={classes.button} color='gray' aria-label=" add">
                <Add />
              </Fab>
            )
          }
        </Container>
        <Container style={classes.postList}>
          {this.state.postsList.map(post =>
            <Card style={classes.card}>
              <CardContent>

                <Typography style={classes.postText} color="textSecondary" gutterBottom>
                  {post.content}
                </Typography>
                <Typography style={classes.userName} color="textSecondary" gutterBottom>
                  @{post.postedBy},
                </Typography>
                <Typography style={{ color: 'red' }} color="textSecondary" gutterBottom>
                  {post.postedById}

                </Typography>

                {user && this.state.currentUser === post.postedById && (
                  < Delete onClick={() => this.deletePost(post.key)} variant='contained' color='primary' />
                )}
              </CardContent>
            </Card>
          )}
        </Container>
      </div >
    )
  }

}
export default Wall;