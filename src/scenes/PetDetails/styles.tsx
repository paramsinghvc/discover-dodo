import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import MobileStepper from "@material-ui/core/MobileStepper";

export const useStyles = makeStyles(theme => ({
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
    padding: "10px",
    marginTop: "10px"
  },
  mapBox: {
    marginTop: "10px",
    height: "150px"
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

export const Carousel = styled.section`
  width: 100%;
  position: relative;
  height: "fit-content";
  max-height: 300px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const CarouselImg = styled.img`
  width: "fit-content";
  height: 300px;
`;

export const StyledMobileStepper = styled(MobileStepper)`
  position: absolute;
  bottom: 0;
  width: calc(100% - 16px);
  background: rgba(202, 202, 202, 0.4);
`;
