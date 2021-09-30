import React, { useContext } from "react";
import { AuthHome } from "../containers";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { userSelector } from '../reduxApp/user/userSlice'

export default function Feed() {

  const { signedIn } = useSelector(userSelector)

  return (
    <>
      {!signedIn && <Redirect to="/" />}
      {signedIn && <AuthHome />}
    </>
  );
}
