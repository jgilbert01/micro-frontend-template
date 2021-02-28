import React, { memo } from 'react';
import {
  Checkbox,
  Icon,
  List,
  Segment,
} from 'semantic-ui-react';

import { Link } from "@reach/router";

const TaskListItem = memo(({
  id, subject, route, checked,
  check, remove, close }) => (
  <List.Item
    key={id}
    style={{ padding: '5px 0' }}
  >
    <Segment>

    <List.Content floated='left'>
      <Checkbox
        onClick={check}
        checked={checked}
      />
    </List.Content>

    <List.Content as={Link} to={route} onClick={close}>
      {subject}
    </List.Content>

    <List.Content floated='right'>
      <Icon name='trash' onClick={remove} />
    </List.Content>

    </Segment>
  </List.Item>
));

export default TaskListItem;