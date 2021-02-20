import React, { memo } from 'react';
import { List, Paper } from '@material-ui/core';

import TaskListItem from './task-list-item';

const TaskList = memo(props => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          {props.items.map((task, idx) => (
            <TaskListItem
              {...task}
              key={`TaskItem.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TaskList;