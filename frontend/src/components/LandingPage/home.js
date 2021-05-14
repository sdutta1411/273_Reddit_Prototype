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
      name: "Reddit Clone",
      description: "First page of the Internet",
      image:
        "https://res.cloudinary.com/dikqsaz3t/image/upload/v1620971286/oalqzzw2ydpoccahgkir.jpg",
    },
    {
      name: "Reddit Prototype",
      description: "Home page of the Internet",
      image:
        "https://res.cloudinary.com/dikqsaz3t/image/upload/v1620971279/skdbkwvlrchyiyob3i0i.jpg",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Grid container justify="center">
          <Card
            className={classes.root}
            style={{ minWidth: "400px", height: "400px" }}
          >
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
