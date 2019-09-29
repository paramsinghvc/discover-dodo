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
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import styled from "@emotion/styled";
import Avatar from "@material-ui/core/Avatar";

import ApiService, { wrapOperation } from "shared/services/apiService";
import safeGet from "shared/utils/safeGet";
import ProfileIcon from "assets/Profile-512.png";
import PlaceholderImg from "assets/placeholder-gray.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "auto",
    margin: "50px auto",
    maxWidth: "50%",
    minWidth: 400
  },

  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden"
  },

  descriptionArea: {
    padding: 5
  },

  descriptionBox: {
    padding: "10px"
  },

  headerText: {
    color: "rgba(0, 0, 0, 0.85)",
    padding: "20px"
  },

  descriptionText: {
    color: "rgba(0, 0, 0, 0.8)",
    fontWeight: "normal",
    padding: " 20px "
  },

  avatar: {
    margin: "auto",
    width: 60,
    height: 60,
    filter: "grayscale(100%)"
  }
}));

const Carousel = styled.section`
  width: 100%;
  position: relative;
  height: "fit-content";
  max-height: 300px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
`;

const CarouselImg = styled.img`
  width: "fit-content";
  max-height: 300px;
`;

const StyledMobileStepper = styled(MobileStepper)`
  position: absolute;
  bottom: 0;
  width: calc(100% - 16px);
  background: rgba(202, 202, 202, 0.4);
`;

export const PetDetails: React.FC<RouteComponentProps> = ({
  match,
  ...props
}) => {
  const petId = safeGet(match, "params.id");
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [petDetails, setPetDetails] = useState<any>([]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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

  const maxSteps = safeGet(petDetails, "photos", []).length || 1;

  return (
    <div className={classes.root}>
      {maxSteps > 0 && (
        <>
          <Carousel>
            <CarouselImg
              src={safeGet(petDetails, `photos[${activeStep}]`, PlaceholderImg)}
            />

            <StyledMobileStepper
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
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </Carousel>
        </>
      )}
      <Grid container spacing={2} className={classes.descriptionArea}>
        <Grid item xs={7}>
          <Paper className={classes.descriptionBox} elevation={5}>
            <Box bgcolor={theme.palette.secondary.light}>
              <Typography
                variant="h3"
                align="left"
                className={classes.headerText}
              >
                {petDetails.petName}
              </Typography>
              <Typography
                variant="subtitle1"
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
            </Box>
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
              variant="body2"
              align="left"
              className={classes.descriptionText}
            >
              <strong>Notes: </strong>
              {petDetails.petNotes
                ? petDetails.petNotes
                : `Please help find the lost ${petDetails.petSpecies}.`}
            </Typography>
            <Divider variant="middle" />

            {petDetails.reward ? (
              <>
                <Typography
                  variant="h5"
                  align="center"
                  // className={classes.headerText}
                >
                  Reward
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  // className={classes.headerText}
                >
                  {petDetails.reward}
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                align="left"
                className={classes.descriptionText}
              >
                Please help reunite {petDetails.petName} with{" "}
                {petDetails.petGender === "Male" ? "his" : "her"} family.
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper elevation={5} className={classes.descriptionBox}>
            <Avatar
              alt="Remy Sharp"
              src={petDetails.ownerPhoto || ProfileIcon}
              className={classes.avatar}
            />
            <Box overflow="auto">
              <Table size={"small"}>
                <TableBody>
                  <TableRow key={1}>
                    <TableCell align="left" variant={"head"}>
                      Owner:
                    </TableCell>
                    <TableCell align="left">
                      {petDetails.ownerName || petDetails.yourName}
                    </TableCell>
                  </TableRow>
                  <TableRow key={2}>
                    <TableCell align="left" variant={"head"}>
                      Address:
                    </TableCell>
                    <TableCell align="left">
                      {petDetails.ownerAddress || petDetails.yourAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow key={3}>
                    <TableCell align="left" variant={"head"}>
                      Contact:
                    </TableCell>
                    <TableCell align="left">
                      {petDetails.ownerPhone ||
                        petDetails.yourPhone ||
                        petDetails.ownerEmail ||
                        petDetails.yourEmail}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PetDetails;
