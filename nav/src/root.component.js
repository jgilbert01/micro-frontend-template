import React, { useState, useReducer } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "@reach/router";
import { useMountPoint } from '@mfe/mount-points';

import { TopRightNav, TopRightNavDrawer, parcelReducer } from './top-right-nav';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  flyoutIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-left',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Root(props) {
  const { items, loading, error } = useMountPoint('left-nav');

  const classes = useStyles();
  const [openLeft, setOpenLeft] = useState(false);
  const handleLeftDrawerOpen = () => setOpenLeft(true);
  const handleLeftDrawerClose = () => setOpenLeft(false);

  const [openRight, setOpenRight] = useState(false);
  const [rightParcel, rightParcelDispatch] = useReducer(parcelReducer, null);
  const toggleRightDrawer = (parcel) => () => {
    rightParcelDispatch({ type: 'open', parcel });
    setOpenRight(!openRight);
  };
  const handleRightDrawerClose = () => {
    rightParcelDispatch({ type: 'close' });
    setOpenRight(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, openLeft && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleLeftDrawerOpen}
            className={clsx(classes.menuButton, openLeft && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Micro Frontend Demo
                  </Typography>

          <TopRightNav toggleRightDrawer={toggleRightDrawer} />

        </Toolbar>
      </AppBar>
      {/* left-nav */}
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !openLeft && classes.drawerPaperClose),
        }}
        open={openLeft}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleLeftDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List>{
          loading ?
            <div>Loading...</div>
            : error ?
              <div>{error}</div>
              :
              items.map((link) => (
                <ListItem button component={Link} key={link.id} to={link.route}>
                  <ListItemIcon>
                    <Icon>{link.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItem>
              ))
        }</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container id="container" maxWidth="lg" className={classes.container} />
      </main>

      {/* top-right-nav */}
      <TopRightNavDrawer parcel={rightParcel} openRight={openRight} handleRightDrawerClose={handleRightDrawerClose} classes={classes} />
    </div>
  );
}
