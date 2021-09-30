import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { loginUser, userSelector } from "../reduxApp/user/userSlice";
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const [loginInput, setLoginInput] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(false);

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)

  const history = useHistory()
  const dispatch = useDispatch();

  const setField = (key, value) => {
    setLoginInput({
      ...loginInput,
      [key]: value,
    });
    if (formErrors[key] !== "") {
      setFormErrors({
        ...formErrors,
        [key]: null,
      });
    }
  };
  const handleErrors = () => {
    const errors = {};
    const { username, password } = loginInput;
    if (!username || username.length === 0) {
      errors.username = "Fill out properly";
    }
    if (!password || password.length === 0) {
      errors.password = "Fill out properly";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = handleErrors();
    if (Object.keys(errors).length >= 1) {
      setFormErrors(errors);
    } else {
      dispatch(loginUser(loginInput))
    }
  };

  useEffect( () => {
    if (isError) {
      console.log('error with Login')
    } 

    if (isSuccess) {
      history.push('/feed')
    }
  }, [isSuccess, isError])

  return (
    <>
      <div className="form-wrapper">
        <h1>Login Page</h1>
        <Form>
          <Form.Group className="mb-3" controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setField("username", e.target.value)}
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
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form>
        {loginError && <p>Invalid Username or password, try again</p>}
      </div>
    </>
  );
}
