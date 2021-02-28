import React, { useEffect, useReducer } from "react";
import {
  Divider,
  Icon,
  Label,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

import Parcel from 'single-spa-react/parcel'
import { Link } from "@reach/router";
import { useMountPoint } from '@mfe/mount-points';

export const useRightSidebar = () => {
  const [state, dispatch] = useReducer(parcelReducer, { visible: false });

  const toggle = ({content, parcel}) => () => {
    // console.log('toggle-state: ', state);
    // console.log('toggle-parcel: ', parcel);

    if (state.visible) {
      dispatch({ type: 'close' });
    } else {
      dispatch({ type: 'open', content, parcel });
    }
  };

  const close = () => dispatch({ type: 'close' });;

  return { state, toggle, close };
};

export const parcelReducer = (state, action) => {
  const { type, content, parcel } = action;
  // console.log('parcelReducer-action:', action);
  // console.log('parcelReducer-state: ', state);
  switch (type) {
    case 'close':
      return { visible: false };
    case 'open':
      return { ...state, visible: true, content, parcel };
    default:
      return state;
  }
};

export const TopRightNav = ({ toggle }) => {
  // console.log('TopRightNav-toggle:', toggle);
  const items = [
    { as: "a", content: "Tasks", key: "tasks", icon: "tasks", parcel: "@mfe/tasks", count: 2 },
    { as: "a", content: "Profile", key: "profile", icon: "user", to: "/profile" },
  ];

  useWindowEvent('TopRightNav', (e) => {
    console.log('TopRightNav: ', e);
    const item = items.find(i => i.key === e.detail.id)
    item.count = (item.count || 0) + e.detail.count;
  });

  return (
    <Menu.Menu position="right">
      {items.map((item) => item.parcel ?
        <Menu.Item key={item.key} onClick={toggle({...item})}>
          <Icon name={item.icon} />
          {item.count ? <Label color='red' circular floating >{item.count}</Label> : undefined}
          {item.content}
        </Menu.Item>
        :
        <Menu.Item {...item} as={Link} />
      )}
    </Menu.Menu>
  );
};

export const RightSidbar = ({
  close,
  parcel,
  content,
  visible
}) => {

  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      // animation="scale down"
      direction='right'
      width="very wide"
      visible={visible}
    >
      <Icon name='chevron right' onClick={close} />
      <Divider />
      <h2>{content}</h2>
      {
        parcel ?
          <Parcel config={() => System.import(parcel)} close={close} updateCount={updateCount} />
          :
          <div>Parcel not defined</div>
      }
      <h4>Parcel: {parcel}</h4>
    </Sidebar>
  );
};

// move to utils module
export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const updateCount = (parcel, count) => {
  window.dispatchEvent(new CustomEvent('TopRightNav', {
    detail: {
      parcel,
      count,
    }
  }));
};