import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'highland';

import {
  fromSqs, toSqsRecords,
  fromS3, toS3Records,
} from 'aws-lambda-stream';

import { handle, Handler } from '../../../src/trigger';

describe('trigger/index.js', () => {
  afterEach(sinon.restore);

  it('should verify Handler', (done) => {
    const event = toSqsRecords([
      {
        body: JSON.stringify({
          Message: JSON.stringify(toS3Records([{
            bucket: {
              name: 'b1',
            },
            object: {
              key: 'k1',
            },
          }])),
        }),
      },
    ]);

    new Handler()
      .handle(event)
      .collect()
      .tap(collected => console.log(JSON.stringify(collected, null, 2)))
      .tap((collected) => {
        expect(collected.length).to.equal(1);
      })
      .done(done);
  });

  it('should test successful handle call', async () => {
    const spy = sinon.stub(Handler.prototype, 'handle').returns(_.of({}));

    const res = await handle({}, {});

    expect(spy).to.have.been.calledWith({});
    expect(res).to.equal('Success');
  });

  it('should test unsuccessful handle call', async () => {
    const spy = sinon.stub(Handler.prototype, 'handle').returns(_.fromError(Error()));

    try {
      await handle({}, {});
      expect.fail('expected error');
    } catch (e) {
      expect(spy).to.have.been.calledWith({});
    }
  });
});
