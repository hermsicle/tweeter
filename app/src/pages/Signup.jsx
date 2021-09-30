import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, userSelector, clearState } from '../reduxApp/user/userSlice'
import { useHistory } from "react-router";

export default function Signup() {
  const [formInput, setFormInput] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [signedUp, setSignedUp] = useState(false);
  const [loginError, setLoginError] = useState("")

  const history = useHistory()
  const dispatch = useDispatch()

  // We can access the redux state using the useSelector hook from redux
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)
  // console.log(isFetching, isSuccess, isError, errorMessage)
  const user = useSelector(userSelector)

  console.log('user: ', user)

  const handleFields = (key, value) => {
    setFormInput({
      ...formInput,
      [key]: value,
    });
    if (formErrors[key] !== "") {
      setFormErrors({
        ...formErrors,
        [key]: "",
      });
    }
  };

  const handleFormErrors = () => {
    const errors = {};
    const { email, username, password } = formInput;

    if (!email || email === "") {
      errors.email = "Cannot be empty";
    }
    if (!username || username === "") {
      errors.username = "Cannot be empty";
    }
    if (!password || password === "") {
      errors.password = "Cannot be empty";
    }
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check for errors
    const errors = handleFormErrors();
    if (Object.keys(errors).length >= 1) {
      setFormErrors(errors);
    } else {
      // If no errors, dispatch the signupUser ACTION and pass formInput data as argument
      dispatch(signupUser(formInput))
    }
  };
  
  useEffect( () => {
    if (isSuccess) {
      // dispatch(clearState())
      // redirect to home page
      history.push('/login')
    } 

    if (isError) {
      // set error message
      console.log(errorMessage)
      setLoginError(errorMessage)
      // dispatch(clearState())
    }
  } , [isSuccess, isError, errorMessage, dispatch, history])

  return (
    <>
      {signedUp && <Redirect to="/login"></Redirect>}
      <div className="form-wrapper">
        <h1>Signup Page</h1>
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => handleFields("email", e.target.value)}
              isInvalid={formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => handleFields("username", e.target.value)}
              isInvalid={formErrors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => handleFields("password", e.target.value)}
              isInvalid={formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
