import React, { memo } from 'react';
import { List, Paper } from '@material-ui/core';

import TaskListItem from './task-list-item';

const TaskList = memo(({ items, onItemRemove, onItemCheck, handleRightDrawerClose }) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          {items.map((task, idx) => (
            <TaskListItem
              {...task}
              id={idx}
              key={`TaskItem.${idx}`}
              divider={idx !== items.length - 1}
              onButtonClick={() => onItemRemove(idx)}
              onCheckBoxToggle={() => onItemCheck(idx)}
              handleRightDrawerClose={handleRightDrawerClose}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TaskList;