import React from "react";
import { Group, Input, FormInputLabel } from "./form-input.styles";

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      {/* spread operator pass all props into componenet, 
        if dont want to pass all, desstructure*/}
      <Input className="form-input" {...otherProps} />
      <FormInputLabel shrink={otherProps.value.length}>
        {label}
      </FormInputLabel>
    </Group>
  );
};

export default FormInput;
