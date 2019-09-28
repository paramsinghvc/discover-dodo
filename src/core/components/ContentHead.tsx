import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "assets/filter.svg";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 0px rgb(56,56,56)",
    height: 75,
    width: "100%",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  filterToggle: {
    width: "3.5rem",
    fontSize: "0.5rem",
    marginRight: "1rem"
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: "1.25rem",
    // backgroundColor: "#394A6D",
    color: "#394A6D"
  }
}));

export default function ContentHeadSection() {
  const classes = useStyles();

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "lost" },
    { key: 1, label: "found" },
    { key: 2, label: "Dog" },
    { key: 3, label: "Cat" },
    { key: 4, label: "Abandoned" }
  ]);
  const handleDelete = (chipToDelete: any) => () => {
    if (chipToDelete.label === "React") {
      alert("Why would you want to delete React?! :)");
      return;
    }
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <section className={classes.root}>
      <img
        src={Filter}
        className={classes.filterToggle}
        alt="filter"
        style={{ color: "#394A6D !important" }}
      />
      {chipData.map(data => {
        return (
          <Chip
            variant="outlined"
            key={data.key}
            color="primary"
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </section>
  );
}
