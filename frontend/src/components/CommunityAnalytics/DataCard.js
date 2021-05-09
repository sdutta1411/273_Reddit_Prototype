import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "48%",
    marginTop:"3%",
    marginLeft:"2%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    paddingBottom:'5px'
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    marginRight:"2%",
  },

}));

export default function GraphCard(props) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
            {props.text}
          </Typography>
          <BarChart
            width={600}
            height={300}
            data={props.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            className={classes.card}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" width={200} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={props.x_key} fill={props.bar_color} />
            {/* <Bar dataKey="UserCount" fill="#82ca9d" /> */}
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
