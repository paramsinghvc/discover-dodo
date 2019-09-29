import React, { FC } from "react";
import styled from "@emotion/styled";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";

const Holder = styled.section`
  margin-bottom: 100px;
`;
const ButtonContent = styled.section`
  display: flex;
  align-items: center;
  > span {
    margin-left: 15px;
  }
`;

const InfoText: FC<{ value: string }> = ({ value, ...props }) => {
  return (
    <Holder>
      <Button variant="contained" color="secondary" {...props}>
        <ButtonContent>
          <SaveAlt />
          <span>{value}</span>
        </ButtonContent>
      </Button>
    </Holder>
  );
};

export default InfoText;
