import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import 'fake-indexeddb/auto';
import nock from 'nock';

import { useLiveQuery } from 'dexie-react-hooks';

import DatabaseLoad from '../../components/DatabaseLoad';
import useDatabase from "../../hooks/useDatabase";
import * as utils from '../../utils';

// @ts-ignore
import { useMountPoint } from "@template-ui/main";

jest.mock("@template-ui/main", () => ({
  useMountPoint: jest.fn(),
}));

nock('http://localhost')
  .get('/tasks').reply(200, {
    last: undefined,
    data: [
      {
        id: '1',
        type: 't0',
        status: 's0',
        timestamp: 1693236475001
      },
    ],
  });

const TestComponent = () => {
  const db: any = useDatabase('test3');
  const tasks = useLiveQuery(() => db.tasks.toArray());
  // console.log('tasks: ', tasks);
  if (!tasks) return null;
  return <div>length: {tasks.length}</div>;
};

describe('components/DatabaseLoad', () => {
  beforeEach(() => {
    jest.spyOn(utils, 'now').mockImplementation(() => 1693235475000);
  });

  it('should create database', async () => {
    (useMountPoint as jest.Mock).mockImplementation(() => {
      return {
        items: [{
          name: 'test3',
          tables: {
            tasks: {
              schema: 'id, type, status, timestamp',
              load: 'http://localhost/tasks',
              sync: 'http://localhost/tasks',
              prune: 1000 * 60 * 60 * 24 * 3, // days
            }
          }
        }]
      };
    });

    render(<DatabaseLoad />);
  });

  it("should use database 3", async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.getByText('length: 1')).toBeInTheDocument());
    // screen.debug();
  });
});