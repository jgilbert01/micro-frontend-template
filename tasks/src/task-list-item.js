import React, { memo } from 'react';
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import { Link } from "@reach/router";

const TaskListItem = memo(({
  id, subject, route, checked, divider,
  onCheckBoxToggle, onButtonClick, handleRightDrawerClose }) => (
  <ListItem
    divider={divider}
    component={Link}
    key={id}
    to={route}
    state={{ id, subject, checked }}
    onClick={handleRightDrawerClose}>

    <ListItemText primary={subject} />
    
    <ListItemSecondaryAction>
      <Checkbox
        onClick={onCheckBoxToggle}
        checked={checked}
        disableRipple
      />
      <IconButton aria-label="Delete Task" onClick={onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

export default TaskListItem;