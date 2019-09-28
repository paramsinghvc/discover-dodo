import React, { FC } from "react";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const LabelledRadioGroup: FC<
  {
    datasource: string[];
    value: string;
    label: string;
    onChange: (event: any) => void;
  } & RadioGroupProps
> = ({ datasource = [], value, onChange, label, ...props }) => {
  return (
    <FormControl
      component="fieldset"
      margin="normal"
      css={css`
        text-align: left;
        display: flex;
      `}
    >
      <FormLabel
        component="legend"
        css={css`
          margin-bottom: 10px;
        `}
      >
        {label}
      </FormLabel>
      <RadioGroup value={value} onChange={onChange} {...props}>
        {datasource.map(label => (
          <FormControlLabel
            key={label}
            value={label}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default LabelledRadioGroup;
