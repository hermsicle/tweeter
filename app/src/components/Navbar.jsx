import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { userSelector, checkToken, logoutUser, clearState } from "../reduxApp/user/userSlice";

//import user state 

export default function MyNavbar() {

  const [signed, setSigned] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { signedIn } = useSelector(userSelector)

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(clearState(true))
    history.push('/login')
    console.log('LOG OUT YO')
  };

  console.log('user is ', signedIn )

  useEffect(() => {
    let validToken = { token: localStorage.getItem('token')}
    dispatch(checkToken(validToken))
  }, [dispatch])

  return (
    <Navbar bg="primary" variant="dark" className="navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand> Tweets 👻</Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
        { signedIn ? 
            <Button onClick={handleLogOut}>Log out</Button>
          : 
          <>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
          </>
        }
        </Nav>
      </Container>
    </Navbar>
  );
}
