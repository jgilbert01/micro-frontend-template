import React, { memo } from 'react';
import { List } from 'semantic-ui-react';

import TaskListItem from './TaskListItem';

const TaskList = memo(({ items, onItemRemove, onItemCheck, close }) => (
  <>
    {items.length > 0 && (
      <List size='large'>
          {items.map((item, idx) => (
            <TaskListItem
              {...item}
              id={idx}
              key={`TaskItem.${idx}`}
              remove={() => onItemRemove(idx)}
              check={() => onItemCheck(idx)}
              close={close}
            />
          ))}
      </List>
    )}
  </>
));

export default TaskList;