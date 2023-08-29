import React from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import 'fake-indexeddb/auto';
import nock from 'nock';
import { useLiveQuery } from 'dexie-react-hooks';

import { createDatabase, getDatabase } from '../../models/db';
import * as utils from '../../utils';

nock('http://localhost')
  .get('/tasks').reply(200, {
    last: undefined,
    data: [
      {
        id: '0',
        type: 't00',
        status: 's00',
        timestamp: 1691236475000
      },
      {
        id: '1',
        type: 't0',
        status: 's0',
        timestamp: 1693236475001
      },
    ],
  })
  .put('/tasks/3', {
    id: '3',
    type: 't1'
  }).reply(200)
  .put('/tasks/3', {
    id: '3',
    type: 't11'
  }).reply(200);

describe('models/db', () => {
  beforeEach(() => {
    jest.spyOn(utils, 'now').mockImplementation(() => 1693235475000);
  });

  it('should create database', async () => {
    await createDatabase({
      name: 'test',
      tables: {
        tasks: {
          schema: 'id, type, status, timestamp',
          load: 'http://localhost/tasks',
          sync: 'http://localhost/tasks',
          prune: 1000 * 60 * 60 * 24 * 3, // days
        }
      }
    },
      async () => 'mytoken');
  });

  it('should get database', async () => {
    const db = getDatabase('test');
    expect(db.name).toEqual('test');
  });

  it('should save', async () => {
    const db = getDatabase('test');
    await db.tasks
      .put({ id: '2', type: 't0', latched: true })

      // insert
      .then(() => db.tasks.put({ id: '3', type: 't1' }))
      .then((id: string) => {
        // console.log(id);
        // update
        db.tasks.put({ id, type: 't11' })
          .then(() => {
            // delete
            db.tasks.delete(id);
          });
      })
      .catch(console.log);
  });

  it('should query', async () => {
    const db = getDatabase('test');
    const { result } = renderHook(() =>
      useLiveQuery(() =>
        db.tasks
          // .where('age')
          // .above(75)
          .toArray(),
      ),
    );

    await waitFor(() => result.current.length);

    console.log('query: ', JSON.stringify(result.current, null, 2));
    expect(result.current.length).toEqual(2);
  });
});