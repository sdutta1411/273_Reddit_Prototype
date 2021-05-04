import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import image1 from "./reddit-img1.png";
import image2 from "./reddit-img2.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // marginLeft: 280,
    marginTop: 100,
  },
  media: {
    height: 300,
  },
});

const Home = (props) => {
  const classes = useStyles();
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: {image1},
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: './reddit-img2.png',
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Grid container justify="center">
        
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.image}
              title={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>   
      ))}
    </Carousel>
  );
};

// function Item(props) {
//   const classes = useStyles();
//   return (
    
//   );


export default Home;
