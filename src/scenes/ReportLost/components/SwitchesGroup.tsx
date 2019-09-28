import React, { FC } from "react";
import styled from "@emotion/styled";

const Holder = styled.section`
  display: flex;
  margin-top: 20px;
  > * {
    margin-right: 20px;
  }
`;

const SwitchesGroup: FC<{}> = ({ children }) => {
  return <Holder>{children}</Holder>;
};

export default SwitchesGroup;
