import React from "react";
import { Router } from "@reach/router"

import Profile from './Profile';

const Root = (props) => (
  <Router>
    <Profile path="profile" {...props} />
  </Router>
);

export default Root;
