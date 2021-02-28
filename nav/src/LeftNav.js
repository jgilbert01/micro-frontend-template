import React, { useState } from "react";
import {
  Container,
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";

import { Link } from "@reach/router";
import { useMountPoint } from '@mfe/shared';

export const useLeftNav = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  return { visible, toggle };
};

export const LeftNavMenuItem = ({ toggle }) => (<Menu.Item onClick={toggle}>
  <Icon name="sidebar" />
</Menu.Item>
);

export const LeftNavSidbar = ({
  toggle,
  visible
}) => {
  return (
    <Sidebar
      as={Menu}
      // animation="overlay"
      animation="uncover"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width='thin'
    >
      <Menu.Item icon="chevron left" onClick={toggle}></Menu.Item>
      <LeftNavMenuItems onClick={toggle} />
    </Sidebar>
  );
};

export const LeftNavMenuItems = ({ onClick }) => {

  const { items, loading, error } = useMountPoint('left-nav');

  return loading ?
    <Menu.Item>Loading...</Menu.Item>
    : error ?
      <Menu.Item>{error}</Menu.Item>
      :
      items.map(item => <Menu.Item key={item.key}
        content={item.content} icon={item.icon}
        as={Link} to={item.to} onClick={onClick} />);
};

export const MainContainer = ({ children }) => (
  <Container id="container" style={{ marginTop: "10em" }}>{children}</Container>
);

