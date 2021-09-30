import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthHome, NonAuthHome } from "../containers";

export default function Home() {
  return (
    <div>
      <NonAuthHome />
    </div>
  );
}
