import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import Box, { BoxProps } from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import LayoutHolder from "./LayoutHolder";
import SwitchesGroup from "./SwitchesGroup";
import LabelledRadioGroup from "./LabelledRadioGroup";

// FIXME: Typings
const withLabel = (Control: React.ComponentType) => ({ label, ...props }) => {
  return <FormControlLabel control={<Control {...props} />} label={label} />;
};

const FormHeader: FC<BoxProps & { value: string }> = ({ value, ...props }) => (
  <Box {...props}>{value}</Box>
);

const componentsMap: Map<string, React.ComponentType<any>> = new Map();
componentsMap.set("FORM_HEADER", FormHeader);
componentsMap.set("TEXTFIELD", TextField);
componentsMap.set("RADIO_GROUP", LabelledRadioGroup);
componentsMap.set("LOCATION_INPUT", TextField);
componentsMap.set("FORM_LAYOUT_HOLDER", LayoutHolder);
componentsMap.set("SWITCHES_GROUP", SwitchesGroup);
componentsMap.set("SWITCH", withLabel(Switch));

export default componentsMap;
