import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import 'fake-indexeddb/auto';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from "react-query";

import { useLiveQuery } from 'dexie-react-hooks';

import LongPolling from '../../components/LongPolling';
import DatabaseLoad from '../../components/DatabaseLoad';
import useDatabase from "../../hooks/useDatabase";
import * as utils from '../../utils';

// @ts-ignore
import { useMountPoint } from "@template-ui/main";

jest.mock("@template-ui/main", () => ({
  useMountPoint: jest.fn(),
}));

process.env.LIVE_DATA_URL = 'http://localhost/live-data';

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
  })
  .get('/live-data').reply(200, { // /live-updates
    data: [
      {
        id: '1',
        type: 'task-updated',
        raw: {
          new: {
            id: '1',
            type: 't0',
            status: 's1',
            timestamp: 1693236475001,
          }
        }
      },
    ],
  });

const TestComponent = () => {
  const db: any = useDatabase('test4');
  const tasks = useLiveQuery(() => db.tasks.toArray());
  // console.log('tasks: ', tasks);
  if (!tasks) return null;
  return <div>status: {tasks[0].status}</div>;
};

describe('components/LongPolling', () => {
  beforeEach(() => {
    jest.spyOn(utils, 'now').mockImplementation(() => 1693235475000);
  });

  it('should create database', async () => {
    (useMountPoint as jest.Mock).mockImplementation(() => {
      return {
        items: [{
          name: 'test4',
          tables: {
            tasks: {
              schema: 'id, type, status, timestamp',
              load: 'http://localhost/tasks',
            }
          }
        }]
      };
    });

    render(<DatabaseLoad />);
  });

  it('should long poll', async () => {
    // subscriptions
    (useMountPoint as jest.Mock).mockImplementation(() => {
      return {
        items: [{
          // source: 'xyz-bff-service',
          eventType: 'task-updated', // created, deleted?
          database: 'test4',
          table: 'tasks',
          // roles: ['r1'],
        }]
      };
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <LongPolling />
      </QueryClientProvider>
    );
  });

  it("should use database 4", async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.getByText('status: s1')).toBeInTheDocument());
    // screen.debug();
  });
});