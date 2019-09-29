import React, { FC } from "react";
import styled from "@emotion/styled";
import CheckCircle from "@material-ui/icons/CheckCircle";

const Holder = styled.section`
  margin: 60px auto;
  > p {
    color: #666;
  }
`;

const ColoredCheckCircle = styled(CheckCircle)`
  color: #52de97;
  font-size: 55px;
`;

const InfoText: FC<{ value: string }> = ({ value }) => {
  return (
    <Holder>
      <ColoredCheckCircle fontSize="large" />
      <p>{value}</p>
    </Holder>
  );
};

export default InfoText;
