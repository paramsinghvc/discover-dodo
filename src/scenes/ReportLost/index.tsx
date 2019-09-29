import React, { FC, useMemo, useCallback, memo } from "react";
import { ReactConfigRenderer, IConfig } from "@mollycule/mason";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import FORM_CONFIG_1 from "./config/reportLostStep1.json";
import FORM_CONFIG_2 from "./config/reportLostStep2.json";
import FORM_CONFIG_3 from "./config/reportLostStep3.json";
import FORM_CONFIG_4 from "./config/reportLostStep4.json";
import componentsMap from "./components";
// import DownloadLink from "../GeneratePdf/generatePdf";
// import Typography from "@material-ui/core/Typography";

const Container = styled.section`
  display: grid;
  width: auto;
  margin: 50px auto;
  max-width: 50%;
  min-width: 400px;
`;

// import ApiService, { wrapOperation } from "shared/services/apiService";
// import safeGet from "shared/utils/safeGet";

function getSteps() {
  return [
    "Enter Pet Details",
    "Add more info",
    "Add Owner Info",
    "Download Pamphlet"
  ];
}

const ReportLost: FC<{}> = () => {
  const formRenderer1 = useMemo(() => {
    return new ReactConfigRenderer(FORM_CONFIG_1 as IConfig, componentsMap, {
      // initialValues: initialValuesMap,
    });
  }, []);

  const formRenderer2 = useMemo(() => {
    return new ReactConfigRenderer(FORM_CONFIG_2 as IConfig, componentsMap);
  }, []);

  const formRenderer3 = useMemo(() => {
    return new ReactConfigRenderer(FORM_CONFIG_3 as IConfig, componentsMap);
  }, []);

  const formRenderer4 = useMemo(() => {
    return new ReactConfigRenderer(FORM_CONFIG_4 as IConfig, componentsMap);
  }, []);

  const RenderedFormJSX1 = useMemo<React.ElementType>(
    () => (formRenderer1 ? formRenderer1.render() : () => <></>),
    [formRenderer1]
  );
  const RenderedFormJSX2 = useMemo<React.ElementType>(
    () => (formRenderer2 ? formRenderer2.render() : () => <></>),
    [formRenderer2]
  );
  const RenderedFormJSX3 = useMemo<React.ElementType>(
    () => (formRenderer3 ? formRenderer3.render() : () => <></>),
    [formRenderer3]
  );
  const RenderedFormJSX4 = useMemo<React.ElementType>(
    () => (formRenderer4 ? formRenderer4.render() : () => <></>),
    [formRenderer4]
  );

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const getStepContent = useCallback(
    (stepIndex: number) => {
      switch (stepIndex) {
        case 0:
          return RenderedFormJSX1;
        case 1:
          return RenderedFormJSX2;
        case 2:
          return RenderedFormJSX3;
        default:
          return RenderedFormJSX4;
      }
    },
    [RenderedFormJSX1, RenderedFormJSX2, RenderedFormJSX3, RenderedFormJSX4]
  );

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleSubmit = useCallback(() => {
    if (formRenderer1) {
      console.warn(formRenderer1.getCurrentValuesSnapshot());
      handleNext();
    }
  }, [formRenderer1]);

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {React.createElement(getStepContent(activeStep))}
      <Box mt={4} textAlign="right">
        <Button
          color="secondary"
          size="large"
          fullWidth={false}
          className="right-margin-10"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={false}
          onClick={handleSubmit}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
      {/* <DownloadLink /> */}
    </Container>
  );
};

export default memo(ReportLost);
