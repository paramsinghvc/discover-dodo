import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "assets/funnel.svg";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 0px rgb(220,220,220)",
    height: 75,
    width: "100%",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "sticky",
    zIndex: 3
  },
  filterToggle: {
    width: "2rem",
    fontSize: "0.5rem",
    marginRight: "1rem"
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  listView: {
    height: "40px",
    width: "100px",
    fontSize: "1.25rem"
  },
  mapView: {
    height: "40px",
    width: "100px",
    fontSize: "1.25rem"
  },
  views: {
    marginLeft: "auto",
    marginRight: "4%"
  },
  listViewButton: {},
  mapViewButton: {},
  filterButton: {
    margin: theme.spacing(1)
  }
}));

export default function ContentHeadSection({ onViewChange, isMapView }) {
  const classes = useStyles();

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "lost" },
    { key: 1, label: "found" },
    { key: 2, label: "Dog" },
    { key: 3, label: "Cat" },
    { key: 4, label: "Abandoned" }
  ]);

  const handleDelete = (chipToDelete: any) => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const handleOnClickListView = () => {
    onViewChange(1);
  };

  const handleOnClickMapView = () => {
    onViewChange(0);
  };

  return (
    <section className={classes.root}>
      <IconButton
        color="primary"
        className={classes.filterButton}
        aria-label="filter"
      >
        <img
          src={Filter}
          className={classes.filterToggle}
          alt="filter"
          style={{ color: "#394A6D !important" }}
        />
      </IconButton>

      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            color="secondary"
            label={data.label}
            // onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}

      <ButtonGroup size="small" className={classes.views}>
        <Button
          variant={isMapView ? undefined : "contained"}
          color="primary"
          className={classes.listViewButton}
          onClick={handleOnClickListView}
        >
          List View
        </Button>
        <Button
          variant={isMapView ? "contained" : undefined}
          color="primary"
          className={classes.mapViewButton}
          onClick={handleOnClickMapView}
        >
          Map View
        </Button>
      </ButtonGroup>
    </section>
  );
}
