import React from "react";
import { Menu } from "semantic-ui-react";

const TopNavBar = ({
  children,
}) => (
  <Menu fixed="top" inverted style={{ padding: "20px" }}>
    {children}
  </Menu>
);

export default TopNavBar;