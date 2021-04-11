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
import { useMountPoint, useWindowEvent, dispatchWindowEvent, useAuth } from '@mfe/shared';

export const useRightSidebar = () => {
  const [state, dispatch] = useReducer(parcelReducer, { visible: false });

  const toggle = ({ content, parcel }) => () => {
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

export const TopRightNav = ({ children, toggle }) => {
  const { items, loading, error } = useMountPoint('top-right-nav');
  const { isSignedIn, hasRole } = useAuth();

  useWindowEvent('TopRightNav', (e) => {
    console.log('TopRightNav: ', e);
    const item = items.find(i => i.parcel === e.detail.parcel);
    if (item)
      item.count = e.detail.count;
  });

  return (
    <Menu.Menu position="right">
      {loading ?
        <Menu.Item>Loading...</Menu.Item>
        : error ?
          <Menu.Item>{error}</Menu.Item>
          :
          items
            .filter((item) => !item.isSignedIn || isSignedIn)
            .filter((item) => !item.role || hasRole(item.role))
            .map((item) => item.parcel ?
              <Menu.Item key={item.key} onClick={toggle({ ...item })}>
                <Icon name={item.icon} />
                {item.count ? <Label color='red' circular floating >{item.count}</Label> : undefined}
                {item.content}
              </Menu.Item>
              :
              <Menu.Item {...item} as={Link} />
            )}
      {children}
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
          <Parcel config={() => System.import(parcel)} close={close} updateCount={updateCount(parcel)} />
          :
          <div>Parcel not defined</div>
      }
      <h4>Parcel: {parcel}</h4>
    </Sidebar>
  );
};

export const updateCount = (parcel) => (count) => {
  dispatchWindowEvent('TopRightNav', {
    parcel,
    count,
  });
};