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
import Tooltip from '@material-ui/core/Tooltip';

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
  buttonEnable: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: 'white', 
    backgroundColor: '#33B8FF'
  },
  buttonDisable: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: '#33B8FF', 
    backgroundColor: '#ECF2F5'
  },
  deleteIcon: {
    color: '#14486'
  },
  userName: {
    color: '#144864'
  },
  postText: {
    fontSize: 25
  }, 
  cardButtom: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
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


  // Get Post and Current Logged in user!
  componentDidMount() {
    this.getPosts()
    this.currentUser()
  }

// Function to get Users from Database
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


// Function to get Posts from Database
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


//Function to create posts
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


  //delete post by postId 
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
        <Tooltip title="Add Post" aria-label="add">
          {user ? (
            <Fab onClick={this.handleClickOpen} style={classes.buttonEnable}  aria-label=" add">
              <Add />
            </Fab>
          ) : (
              <Fab onClick={this.disabledPost} style={classes.buttonDisable}  aria-label=" add">
                <Add />
              </Fab>
            )
          }
           </Tooltip>
        </Container>

        {/* This will render all post  */}
        <Container style={classes.postList}>
          {this.state.postsList.map(post =>
            <Card style={classes.card}>
              <CardContent>

                <Typography style={classes.postText} color="textSecondary" gutterBottom>
                  {post.content}
                </Typography>
               
                <Container style={classes.cardButtom}>
           
                {/* This will disable anothe user to delete, other user's post */}
              
                <Typography style={classes.userName}  gutterBottom>
                  @{post.postedBy}
                </Typography>
                {user && this.state.postedBy === post.postedBy && (
                   <Tooltip title="Delete Post" aria-label="add">
                  < Delete onClick={() => this.deletePost(post.key)} variant='contained' style={{color:'#144864'}} />
                  </Tooltip>
              )}
              </Container>
                  
              </CardContent>
            </Card>
          )}
        </Container>
      </div >
    )
  }

}
export default Wall;