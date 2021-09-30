import React from "react";
import { Link } from "react-router-dom";

export default function NonAuthHome() {
  return (
    <div className="home-wrapper">
      <h1>Welcome to Tweets 👻 </h1>
      <div className="home-inner">
        <p>
          New User? Sign up <Link to="/signup">here</Link>
        </p>
        <p>
          Returning user? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}
