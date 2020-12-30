import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { PROFILE_CREATE_MUTATION } from "../../Api/profile/profile";
import { USER_REGISTER_MUTATION } from "../../Api/user";
import "./Register.css";

const Register = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  const history = useHistory();
  const [allowButton, setAllowButton] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [createProfile] = useMutation(PROFILE_CREATE_MUTATION);
  const [registerUser, { data, loading }] = useMutation(USER_REGISTER_MUTATION);

  // After a submit
  useEffect(() => {
    const handleLogin = async () => {
      // Reset previous state
      setErrorMessages([]);

      if (data) {
        const {
          register: { user, errors },
        } = data;

        if (user === null) {
          const errorValues = Object.entries(errors);

          errorValues.map(([, errorArray]) => {
            const { messages } = errorArray;

            return messages.map((message) => {
              // Set the message with previous messages
              return setErrorMessages((prevState) => [...prevState, message]);
            });
          });
        } else {
          await createProfile({ variables: { user: usernameInput } });
          history.push("/login");
        }
      }
    };
    handleLogin();
  }, [data, history, usernameInput, createProfile]);

  const handleOnClick = async (e) => {
    const user_pressed_enter = e.key === "Enter";
    const user_submited_button = e.target.tagName === "FORM";
    const canSubmit = allowButton;

    if (canSubmit && (user_pressed_enter || user_submited_button)) {
      await registerUser({
        variables: {
          username: usernameInput,
          email: emailInput,
          password1: passwordInput,
          password2: passwordConfirmInput,
        },
      });
    }
  };

  // Check if all fields are filled
  useEffect(() => {
    const all_fields_are_filled =
      usernameInput !== "" &&
      emailInput !== "" &&
      passwordInput !== "" &&
      passwordConfirmInput !== "";

    if (all_fields_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [usernameInput, emailInput, passwordInput, passwordConfirmInput]);

  return (
    <div className="register-container">
      {errorMessages.length !== 0 ? (
        <Message
          className="error-message-container"
          error
          header="There was some errors with your submission"
          list={errorMessages}
        />
      ) : null}
      <Form onSubmit={handleOnClick}>
        <Form.Field>
          <label>Username</label>
          <input
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
            autoComplete="one-time-code"
            placeholder="Username"
            maxLength="40"
            autoFocus
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            onChange={(e) => setEmailInput(e.target.value)}
            value={emailInput}
            autoComplete="one-time-code"
            maxLength="50"
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            autoComplete="one-time-code"
            type="password"
            maxLength="30"
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            onChange={(e) => setPasswordConfirmInput(e.target.value)}
            value={passwordConfirmInput}
            autoComplete="one-time-code"
            type="password"
            maxLength="30"
            placeholder="Confirm Password"
          />
        </Form.Field>
        <Form.Field>
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/login" className="ml-2">
              Sign in
            </Link>
          </p>
        </Form.Field>
        <Button
          disabled={!allowButton || loading}
          className="submit-button"
          type="submit"
          primary
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
