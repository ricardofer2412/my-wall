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


const classes = {
  botton: {
    flex: 'flex',
    flexDirection: "column-reverse",
    color: 'red'
  },
  card: {
    width: 300,
    height: 100
  }
}

class Wall extends React.Component {
  constructor(props) {
    super(props)
    this.postRef = firebase.firestore().collection("posts")
    this.state = {
      content: '',
      key: '',
      postsList: [],
      open: false
    }
  }

  componentDidMount() {

    this.getPosts()
  }

  async getPosts() {
    const postsList = []
    await this.postRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { content } = doc.data()
        console.log(doc.data().content)
        postsList.push(
          {
            key: doc.id,
            content
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
    const newPostsList = [...this.state.postsList, { content: this.state.content, key: this.state.key }]
    this.postRef.add({
      content: this.state.content
    })
      .then(res => {
        this.setState({
          postsList: newPostsList,
          content: '',
        })
      })
    this.handleClickClose()
  }

  deletePost = (id) => {
    this.postRef.doc(id).delete().then(() => {
      console.log("Post successfully deleted")
      this.props.history.push('/')
    }).catch((error) => {
      console.log('Error removing document: ', error)
    })
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

  render() {
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
              autoFocus
              InputProps={{ name: 'content' }}
              onChange={this.onChange}
              value={this.state.content}
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

        <Fab onClick={this.handleClickOpen} style={classes.button} color='primary' aria-label=" add">
          <Add />
        </Fab>

        <Container>
          {this.state.postsList.map(post =>
            <Card style={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {post.key}
                  {post.content}
                </Typography>
                <button onClick={() => this.deletePost(post.key)} class="btn btn-danger">Delete</button>
              </CardContent>
            </Card>
          )}
        </Container>
      </div >
    )
  }

}
export default Wall;