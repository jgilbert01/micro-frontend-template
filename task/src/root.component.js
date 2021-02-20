import React from "react";
import { Router } from "@reach/router"

import Task from './task';

export default function Root(props) {
  return (
    <Router>
      <Task default={true} {...props} />
    </Router>
  );
}
