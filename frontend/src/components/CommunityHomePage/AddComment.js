import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, TextField, Button, Snackbar } from '@material-ui/core';
import { useCommentInputStyles } from '../../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';


const AddComment = ({ user, postId }) => {
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
  const classes = useCommentInputStyles();
  const [comment, setComment] = useState('');
  const[openAddSnack, setOpenAddSnack] = useState(false);
  function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}
  const handleAddSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }    
  setOpenAddSnack(false);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json' ,
      'Authorization': token
  }
      const body = {
        'email':userLocalStorage.email,
        'username':user,
        'postId':postId,
        'comment':comment
     }
     const response = await axios.post('http://localhost:3001/api/comment/createnewcomment',body,{
      headers: headers
    });
    if(response.status===200){
      setOpenAddSnack(true);
    }
    
  };

  return (
    <div className={classes.wrapper}>
            <Snackbar open={openAddSnack} autoHideDuration={6000} onClose={handleAddSnackClose}>
                    <Alert style={{fontSize:"20px"}} onClose={handleAddSnackClose} severity="success">
                        Added comment!
                    </Alert>
            </Snackbar>
        <Typography variant="body2">
          Comment as{' '}
          <Link component={RouterLink} to={`/u/${user.username}`}>
            {user.username}
          </Link>
        </Typography>
      <form className={classes.form} onSubmit={handlePostComment}>
        <TextField
          placeholder={`What are your thoughts?`}
          multiline
          fullWidth
          required
          rows={4}
          rowsMax={Infinity}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.commentBtn}
          startIcon={<SendIcon />}
        >
          {/* {!user ? 'Login to comment' : submitting ? 'Commenting' : 'Comment'} */}
        </Button>
      </form>
    </div>
  );
};

export default AddComment;
