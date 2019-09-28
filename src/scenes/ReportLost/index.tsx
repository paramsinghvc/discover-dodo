import React, { FC, useEffect } from "react";

const ReportLost: FC<{}> = () => {
  useEffect(() => {
    console.warn("HEre");
  }, []);
  return <p>Hola</p>;
};

export default ReportLost;
