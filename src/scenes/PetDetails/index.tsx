/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import { RouteComponentProps } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import { autoPlay } from "react-swipeable-views-utils";
import ApiService, { wrapOperation } from "shared/services/apiService";
import safeGet from "shared/utils/safeGet";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const petDetails1 = {
  isLost: true,
  isSpayed: false,
  isVaccinated: true,
  lastSeenAt: {
    address: "Yelahanka, Bengaluru, Bangalore Urban",
    lat: 13.1185614,
    long: 77.59746169999994
  },
  ownerAddress: "#2/49,rudrana complex , bhartinagar yelahanaka bangalore",
  ownerEmail: "vineetpanwar027@gmail.com",
  ownerName: "vineet panwar",
  ownerPhone: "8123307697",
  petBreed: "african",
  petColor: "black",
  petGender: "Female",
  petName: "cansandra",
  petNotes: "she was  agile and cute",
  petSpecies: "Cat",
  photos: [],
  reward: "",
  timestamp: "2019-09-29T11:19:24.180Z"
};

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden"
  },
  imgContainer: {
    margin: "auto"
  },
  descriptionArea: {
    padding: 5
  },
  descriptionBox: {
    padding: "10px"
  },
  headerText: {
    color: "rgba(0, 0, 0, 0.85)"
  },
  subHeaderText: {
    color: "rgba(0, 0, 0, 0.8)",
    fontWeight: "lighter",
    padding: " 20px "
  },
  descriptionText: {
    color: "rgba(0, 0, 0, 0.8)",
    fontWeight: "normal",
    padding: " 20px "
  }
}));

export const PetDetails: React.FC<RouteComponentProps> = ({
  match,
  ...props
}) => {
  const petId = safeGet(match, "params.id");
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [petDetails, setPetDetails] = useState<any>([]);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  useEffect(() => {
    (async function getUsers() {
      const { response, error } = await wrapOperation(
        ApiService.getDocInCollection
      )("pets", petId);

      if (response) {
        const data = response.data();
        setPetDetails(data);
      } else {
        console.error("Oops", error);
      }
    })();
  }, []);

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className={classes.imgContainer}>
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Grid container spacing={2} className={classes.descriptionArea}>
        <Grid item xs={9}>
          <Paper className={classes.descriptionBox} elevation={5}>
            <Typography
              variant="h3"
              align="left"
              className={classes.headerText}
            >
              {petDetails.petName}
            </Typography>
            <Typography
              variant="h5"
              align="left"
              className={classes.descriptionText}
            >
              {petDetails.petSpecies}
              <span> &#8226; </span>
              {petDetails.petBreed}
              <span> &#8226; </span>
              {petDetails.petColor}
              <span> &#8226; </span>
              {petDetails.petGender}
            </Typography>
            <Divider variant="middle" />
            <Typography
              variant="body2"
              align="left"
              className={classes.descriptionText}
            >
              Last seen at {safeGet(petDetails, "lastSeenAt.address")}
            </Typography>
            <Divider variant="middle" />
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.descriptionText}
            >
              About:
            </Typography>
            <Table size={"small"}>
              <TableBody>
                <TableRow key={1}>
                  <TableCell align="left" variant={"head"}>
                    Owner:
                  </TableCell>
                  <TableCell align="left">{petDetails.ownerName}</TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell align="left" variant={"head"}>
                    Address:
                  </TableCell>
                  <TableCell align="left">{petDetails.ownerAddress}</TableCell>
                </TableRow>
                <TableRow key={3}>
                  <TableCell align="left" variant={"head"}>
                    Contact:
                  </TableCell>
                  <TableCell align="left">
                    {petDetails.ownerPhone || petDetails.ownerEmail}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography
              variant="subtitle2"
              align="left"
              className={classes.descriptionText}
            ></Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={5} className={classes.descriptionBox}>
            {petDetails.reward ? (
              <>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.headerText}
                >
                  Reward
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.headerText}
                >
                  {petDetails.reward}
                </Typography>
                <Divider variant="middle" />
              </>
            ) : null}
            <span>&ldquo;</span>
            <Typography
              variant="body2"
              align="left"
              className={classes.subHeaderText}
            >
              {petDetails.petNotes
                ? petDetails.petNotes
                : `Please help find the lost ${petDetails.petSpecies}.`}
            </Typography>
            <span>&rdquo;</span>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PetDetails;
// name: "Chetak",
//   species: "Horse",
//   breed: "Arabian",
//   lastSeenAt: "HSR Layout",
//   color: "Yellow",
//   contactNumber: 8888888888,
//   reward: "Rs. 1200",
//   ownerName: "Majnu Bhai",
//   ownerAddress: "Mumbai",
// gender: male
