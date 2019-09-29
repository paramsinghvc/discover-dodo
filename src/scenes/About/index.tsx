import React, { FC } from "react";
import styled from "@emotion/styled";

import MapComponent from "core/components/GoogleMap";
import ContentHeadSection from "core/components/ContentHead";

const AboutContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 64px;
`;

const About: FC<{}> = (props: any) => {
  const { history } = props;
  return (
    <>
      <AboutContainer>hi this is about page</AboutContainer>
    </>
  );
};
export default About;
