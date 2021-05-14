import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import NavBarAfterLogin from '../navBar/NavBarAfterLogin'

const SearchList = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 3600,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList() {
  const classes = SearchList();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
      
    <List className={classes.root}>
      {[0, 1, 2, 3,4,5,6].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        <NavBarAfterLogin></NavBarAfterLogin>
        

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              {<Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />}
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Community ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="start" aria-label="comments">
                <CommentIcon />
              </IconButton>
              <IconButton edge="end" aria-label="share">
                <ShareIcon/>
              </IconButton>
              <IconButton edge="start" aria-label="ArrowUpwardTwoTone">
                <ArrowUpwardTwoToneIcon />
              </IconButton>
              <IconButton edge="start" aria-label="ArrowDownwardTwoTone">
                <ArrowDownwardTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
