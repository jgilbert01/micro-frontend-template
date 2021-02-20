import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import Parcel from 'single-spa-react/parcel'

import { useMountPoint } from '@mfe/mount-points';

export function TopRightNav({ toggleRightDrawer }) {
  const { items, loading, error } = useMountPoint('top-right-nav');

  useWindowEvent('TopRightNav', (e) => {
    console.log(e);
    items.find(i => i.id === e.detail.id).count = e.detail.count;
  });

  // https://www.robinwieruch.de/react-usereducer-hook

  return (
    <div>
      {
        loading ?
          <div>Loading...</div>
          : error ?
            <div>{error}</div>
            :
            items.map((button) => (

              <IconButton id={button.id} color="inherit" onClick={toggleRightDrawer(button.parcel)}>
                <Badge badgeContent={button.count} color="secondary">
                  <Icon>{button.icon}</Icon>
                </Badge>
              </IconButton>
            ))
      }
    </div>
  );
}

export function TopRightNavDrawer({ parcel, openRight, handleRightDrawerClose, classes }) {
  return (
    <Drawer
      variant='temporary'
      anchor='right'
      open={openRight}
    >
      <div className={classes.flyoutIcon}>
        <IconButton onClick={handleRightDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <Divider />
      <Container id="flyout" maxWidth="lg" className={classes.container}>
        {
          parcel ?
            <Parcel config={() => System.import(parcel)} />
            :
            <div>Parcel not defined</div>
        }
      </Container>

    </Drawer>
  );
}

export const parcelReducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return null;
    case 'open':
      return action.parcel;
    default:
      return state;
  }
};

// move to utils module
export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};