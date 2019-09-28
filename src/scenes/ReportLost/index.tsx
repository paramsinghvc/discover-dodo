import React, { FC, useMemo, memo } from "react";
import { ReactConfigRenderer, IConfig } from "@mollycule/mason";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DownloadLink from "core/components/GeneratePdf/generatePdf";

import FORM_CONFIG from "./reportLostFormConfig.json";
import componentsMap from "./components";
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

const ReportLost: FC<{}> = () => {
  const formRenderer = useMemo(() => {
    return new ReactConfigRenderer(FORM_CONFIG as IConfig, componentsMap, {
      // initialValues: initialValuesMap,
    });
  }, []);

  const RenderedFormJSX = useMemo<React.ElementType>(
    () => (formRenderer ? formRenderer.render() : () => <></>),
    [formRenderer]
  );

  return (
    <Container>
      <RenderedFormJSX />
      <Box mt={4} textAlign="right">
        <Button
          color="secondary"
          size="large"
          fullWidth={false}
          className="right-margin-10"
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={false}
        >
          Submit
        </Button>
      </Box>
      <Box mr={0} textAlign="right">
        <DownloadLink />
      </Box>
    </Container>
  );
};

export default memo(ReportLost);
