import React from 'react'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';


const classes = {
  botton: {

    flex: 'flex',
    flexDirection: "column-reverse",
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
      postsList: [],
      open: false
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    const postsList = []
    this.postRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {


      })
    })
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  addPost = () => {
    const newPostsList = [...this.state.postsList, { content: this.state.content }]
    this.postRef.add({
      content: this.state.content

    })
      .then((res) => {
        this.setState({
          postsList: newPostsList,
          content: '',
        })
      })
    this.handleClickClose()
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
        Wall
        <Fab onClick={this.handleClickOpen} style={classes.button} color='primary' aria-label=" add">
        </Fab>

        <div style={{ margin: 100 }}>
          {this.state.postsList.map((post) =>
            <Card style={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {post.content}
                </Typography>
              </CardContent>


            </Card>
          )}
        </div>

      </div >
    )
  }

}
export default Wall;