import React, { FC } from "react";
import styled from "@emotion/styled";

import MapComponent from "core/components/GoogleMap";
import ContentHeadSection from "core/components/ContentHead";

const ListContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 64px;
`;

const ListView: FC<{}> = (props: any) => {
  const { history } = props;
  return (
    <>
      <ListContainer>
        <ContentHeadSection history={history} />
        list here
      </ListContainer>
    </>
  );
};
export default ListView;
