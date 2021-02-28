import React from "react";
import { Router } from "@reach/router"

import Thing from './Thing';
import Things from './Things';

const Root = (props) => (
  <Router>
    <Things path="things" {...props} />
    <Thing path="things/:id" {...props} />
  </Router>
);

export default Root;
