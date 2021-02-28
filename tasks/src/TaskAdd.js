import React, { memo } from 'react';
import {
  Segment,
  Form,
} from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

const AddTask = memo(({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Segment>
      <Form onSubmit={handleSubmit((data, e) => {
        console.log('data: ', data);
        e.target.reset();
        onSubmit(data);
      })}>
        <Form.Group style={{ margin: '0' }}>
          <Form.Field>
            <input
              name="subject"
              ref={register}
              placeholder='Subject' />
          </Form.Field>
          <Form.Field>
            <input
              name="route"
              ref={register}
              placeholder='Route' />
          </Form.Field>
          <Form.Button type="submit" primary floated='right'>Add</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
});

export default AddTask;
