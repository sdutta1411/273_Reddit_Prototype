import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, TextField, Button } from '@material-ui/core';
import { useCommentInputStyles } from '../../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';

const AddComment = ({ user, postId }) => {
  const classes = useCommentInputStyles();
  const [comment, setComment] = useState('');

  const handlePostComment = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className={classes.wrapper}>
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
