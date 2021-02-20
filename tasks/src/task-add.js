import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

import { useForm } from 'react-hook-form';

const AddTask = memo(({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <form onSubmit={handleSubmit((data, e) => {
        e.target.reset(); 
        onSubmit(data);
      })}>
        <Grid container>
          <Grid item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Subject"
              name="subject"
              inputRef={register} 
              fullWidth
            />
          </Grid>
          <Grid item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Route"
              name="route"
              inputRef={register} 
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              type="submit"
            >
              Add
        </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
});

export default AddTask;
