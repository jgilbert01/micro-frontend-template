import React from "react";
import {
  Header,
  Menu,
  Sidebar,
} from "semantic-ui-react";

import TopNavBar from './TopNavBar';
import { useRightSidebar, TopRightNav, RightSidbar } from './TopRightNav';
import { useLeftNav, LeftNavMenuItem, LeftNavSidbar, MainContainer } from './LeftNav';
import SignInOut from './SignInOut';

const Root = () => {
  const leftNav = useLeftNav();
  const topRightNav = useRightSidebar();

  return (
    <div>
      <Sidebar.Pushable>
        <LeftNavSidbar {...leftNav} />

        <Sidebar.Pusher
          dimmed={leftNav.visible}
          style={{ minHeight: "100vh" }}
        >

          <TopNavBar>
            <LeftNavMenuItem {...leftNav} />
            <Menu.Item key="title"><h1>Micro Frontend Demo</h1></Menu.Item>
            <TopRightNav {...topRightNav}>
              <SignInOut />
            </TopRightNav>
          </TopNavBar>

          <MainContainer />

        </Sidebar.Pusher>

        <RightSidbar {...topRightNav.state} {...topRightNav} />

      </Sidebar.Pushable>

    </div>
  );
};

export default Root;