import React from "react";
import { List } from 'semantic-ui-react'
import { Link } from "@reach/router";

const Root = (props) => (
  <div>
    <h1>Things</h1>

    <List link>
      <List.Item as={Link} to="/things/1">Thing One</List.Item>
      <List.Item as={Link} to="/things/2">Thing Two</List.Item>
    </List>
  </div>
);

export default Root;