import {
  initialize,
  defaultOptions,
  fromSqs,
  fromS3,
  toPromise,
  debug as d,
} from 'aws-lambda-stream';

import getMetadata from './get-metadata';
import addMetadata from './add-metadata';
import importmap from './importmap';
import layout from './layout';
import mountPoints from './mount-points';

const debug = d('handler');

const OPTIONS = {
  ...defaultOptions,
  debug,
};

const PIPELINES = {
  addMetadata,
  importmap,
  layout,
  mountPoints,
};

export class Handler {
  handle(event, includeErrors = true) {
    return initialize(PIPELINES, OPTIONS)
      .assemble(fromSqs(event)

        .map(uow => ({
          sqsRecord: uow.record,
          record: JSON.parse(uow.record.body),
        }))
        .map(uow => ({
          ...uow,
          snsRecord: uow.record,
          record: JSON.parse(uow.record.Message),
        }))
        .flatMap(uow => fromS3(uow.record)
          .map(record => ({
            ...uow,
            ...record,
          })))
        .through(getMetadata(OPTIONS)), includeErrors);
  }
}

export const handle = async (event, context) => {
  debug('event: %j', event);
  debug('context: %j', context);

  return new Handler()
    .handle(event)
    .tap(debug)
    .through(toPromise);
};

