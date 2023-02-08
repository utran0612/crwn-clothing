import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

// create a default object
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructure the object
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //confirm password matches confirmPassword

    if (password !== confirmPassword) {
      alert("Passwords does not match!");
      return;
    }

    try {
      //see if we can authenticate user with email and password
      const { userAuth } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //create user with email and password
      await createUserDocumentFromAuth(userAuth, { displayName });
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      } else {
        console.log(e);
      }
    }
  };

  const handleChange = (event) => {
    //get the name and value from the event.target (there are 4 pairs of name and value)
    const { name, value } = event.target;
    //update name and value accordingly
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
