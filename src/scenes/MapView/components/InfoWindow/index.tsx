import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40
  }
});

export const MapInfo = props => {
  const classes = useStyles();
  return (
    <Paper>
      <Box fontWeight="fontWeightBold"> DOGGO</Box>
      <Grid container justify="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src="/logo192.png"
          className={classes.bigAvatar}
        />
      </Grid>
      <Table size="small">
        <TableBody>
          <TableRow key={1}>
            <TableCell align="left">Species: </TableCell>
            <TableCell align="right">Dog</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell align="left">Breed: </TableCell>
            <TableCell align="right">German Shepherd</TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell align="left">Color: </TableCell>
            <TableCell align="right">Brown</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
export default MapInfo;
