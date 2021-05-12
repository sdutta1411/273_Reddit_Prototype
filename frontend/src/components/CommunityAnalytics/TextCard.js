import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "48%",
    marginTop: "3%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  title: {
    paddingBottom: "5px",
  },
  card: {
    // marginRight:"2%",
  },
}));

export default function TextCard(props) {
  const classes = useStyles();


  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            {props.text}
          </Typography>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {props.tableHead.map((cell) => (
                    <TableCell>{cell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{props.data.map((row, index) => (
                 <TableRow key={index}>
                    {Object.values(row).map((value) => (
                        <TableCell>{value}</TableCell>
                    ))}
                 </TableRow>
              ))}</TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
