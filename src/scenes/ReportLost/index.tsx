import React, { FC, useMemo, useCallback, memo } from "react";
import { ReactConfigRenderer, IConfig } from "@mollycule/mason";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withRouter, RouteComponentProps } from "react-router";

import FORM_CONFIG_1 from "./config/reportLostStep1.json";
import FORM_CONFIG_2 from "./config/reportLostStep2.json";
import FORM_CONFIG_3 from "./config/reportLostStep3.json";
import FORM_CONFIG_4 from "./config/reportLostStep4.json";
import componentsMap from "./components";
import ApiService, { wrapOperation } from "shared/services/apiService";
import apiService from "shared/services/apiService";
// import DownloadLink from "../GeneratePdf/generatePdf";
// import safeGet from "shared/utils/safeGet";
// import Typography from "@material-ui/core/Typography";

const Container = styled.section`
  display: grid;
  width: auto;
  margin: 50px auto;
  max-width: 50%;
  min-width: 400px;
`;

const DisplaySection = styled.section<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
`;

function getSteps() {
  return [
    "Enter Pet Details",
    "Add more info",
    "Add Owner Info",
    "Download Pamphlet"
  ];
}

const ReportLost: FC<{} & RouteComponentProps> = ({ history }) => {
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
  const [activeDocumentId, setActiveDocumentId] = React.useState<
    firebase.firestore.DocumentReference["id"]
  >();
  const steps = getSteps();

  const handleNext = useCallback(() => {
    if (activeStep === steps.length - 1) return;
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, [activeStep, steps]);

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, [setActiveStep]);

  const submitFirstForm = useCallback(async () => {
    const formValues = formRenderer1.getCurrentValuesSnapshot();
    console.warn(formValues);
    delete formValues.formHeader;

    const operation = !activeDocumentId
      ? wrapOperation(apiService.addDataToCollection)("pets", formValues)
      : wrapOperation(apiService.updateDocInCollection)(
          "pets",
          activeDocumentId,
          formValues
        );

    const { response, error } = await operation;
    if (!error) {
      console.warn(response);
      if (!activeDocumentId && response) {
        setActiveDocumentId(response.id);
      }
      handleNext();
    } else {
      console.warn(error);
    }
  }, [formRenderer1, handleNext, activeDocumentId]);

  const submitSecondForm = useCallback(async () => {
    const formValues = formRenderer2.getCurrentValuesSnapshot();
    console.warn(formValues);
    formValues.photos = (formValues.photos || []).map(
      photo => photo.downloadURL
    );
    delete formValues.formHeader2;

    if (!activeDocumentId) return;

    const { response, error } = await wrapOperation(
      apiService.updateDocInCollection
    )("pets", activeDocumentId, formValues);

    if (!error) {
      console.warn(response);
      handleNext();
    } else {
      console.warn(error);
    }
  }, [formRenderer2, handleNext, activeDocumentId]);

  const submitThirdForm = useCallback(async () => {
    const formValues = formRenderer3.getCurrentValuesSnapshot();
    console.warn(formValues);
    delete formValues.formHeader3;

    if (!activeDocumentId) return;

    const { response, error } = await wrapOperation(
      apiService.updateDocInCollection
    )("pets", activeDocumentId, formValues);

    if (!error) {
      console.warn(response);
      handleNext();
    } else {
      console.warn(error);
    }
  }, [formRenderer3, handleNext, activeDocumentId]);

  const handleSubmit = useCallback(() => {
    switch (activeStep) {
      case 0:
        submitFirstForm();
        break;
      case 1:
        submitSecondForm();
        break;
      case 2:
        submitThirdForm();
        break;
      case 3:
        history.push("/");
        break;
    }
  }, [submitFirstForm, submitSecondForm, submitThirdForm, activeStep]);

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* {React.createElement(getStepContent(activeStep))} */}
      <DisplaySection show={activeStep === 0}>
        <RenderedFormJSX1 />
      </DisplaySection>
      <DisplaySection show={activeStep === 1}>
        <RenderedFormJSX2 />
      </DisplaySection>
      <DisplaySection show={activeStep === 2}>
        <RenderedFormJSX3 />
      </DisplaySection>
      <DisplaySection show={activeStep === 3}>
        <RenderedFormJSX4 />
      </DisplaySection>

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

export default withRouter(memo(ReportLost));
