import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 70,
    height: 70,
    border: "1px solid black"
  },
  paper: {
    backgroundColor: "white"
  }
});

export const MapInfo = props => {
  const classes = useStyles();

  const handleNameClick = useCallback(() => {
    console.warn("go to history page");
  }, []);
  return (
    <Paper className={classes.paper}>
      <Box fontWeight="fontWeightBold" bgcolor="secondary.main" p={5} m={-4}>
        <Typography variant="h6" onClick={handleNameClick}>
          DOGGO
        </Typography>
      </Box>
      <Grid container justify="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src="/petPic.png"
          className={classes.bigAvatar}
          onClick={handleNameClick}
        />
      </Grid>
      <Table size={"small"}>
        <TableBody>
          <TableRow key={1}>
            <TableCell align="right" variant={"head"}>
              Species:
            </TableCell>
            <TableCell align="left">Dog</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell align="right" variant={"head"}>
              Breed:
            </TableCell>
            <TableCell align="left">German Shepherd</TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell align="right" variant={"head"}>
              Color:
            </TableCell>
            <TableCell align="left">Brown</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
export default MapInfo;
