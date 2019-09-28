import React, { FC } from "react";
import styled from "@emotion/styled";

const Holder = styled.section`
  display: flex;
`;

const SwitchesGroup: FC<{}> = ({ children }) => {
  return <Holder>{children}</Holder>;
};

export default SwitchesGroup;
