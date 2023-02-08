import React from "react";
import "./form-input.styles.scss";

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {/* spread operator pass all props into componenet, 
        if dont want to pass all, desstructure*/}
      <input className="form-input" {...otherProps} />
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
