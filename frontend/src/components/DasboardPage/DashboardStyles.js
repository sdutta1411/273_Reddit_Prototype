import { makeStyles } from '@material-ui/core/styles';
 
export const useCardStyles = makeStyles(
    (theme) => ({
      root: {
        display: 'flex',
        width: 'auto',
        borderRadius: 0,
      },
      cardRoot: {
        maxWidth: 1000,
        marginLeft: 150,
        marginTop: 50,
      },
      paperModal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      votesWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 30,
        alignItems: 'center',
        backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
      },
      thumbnailWrapper: {
        alignSelf: 'center',
        marginLeft: 5,
      },
      thumbnail: {
        fontSize: '2em',
        width: 70,
        height: 90,
        textAlign: 'center',
        backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
          width: 60,
          height: 80,
        },
      },
      thumbnailIcon: {
        marginTop: 30,
      },
      postInfoWrapper: {
        padding: 10,
        paddingBottom: 0,
      },
      userAndDate: {
        marginLeft: 10,
      },
      commentsBtn: {
        textTransform: 'none',
        color: theme.palette.type === 'light' ? '#787878' : '#dadada',
      },
      title: {
        marginRight: 5,
        [theme.breakpoints.down('xs')]: {
          fontSize: '1em',
          margin: 0,
        },
      },
      bottomBtns: {
        display: 'flex',
      },
    }),
    { index: 1 }
  );