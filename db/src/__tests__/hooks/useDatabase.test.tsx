import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";

import useDatabase from "../../hooks/useDatabase";
import { createDatabase } from '../../models/db';

const TestComponent = () => {
  const db: any = useDatabase('test2');
  // console.log('db: ', db);
  return <div>{db.name}</div>;
};

describe("useDatabase hook", () => {
  it('should create database', async () => {
    await createDatabase({
      name: 'test2',
      tables: {
        tasks: {
          schema: '$$id, type, status, timestamp'

        }
      }
    },
    async () => 'mytoken');
  });

  it("should use database", async () => {
    const { result, waitFor } = renderHook(
      () =>
        useDatabase('test2'),
    );

    await waitFor(() => result.current.db);
    // console.log('qc: ', result.current);
    expect(result.current.name).toEqual('test2');
  });

  it("should use database 2", async () => {
    const { container } = render(<TestComponent />);
    expect(container.textContent).toMatch('test2');
  });
});
