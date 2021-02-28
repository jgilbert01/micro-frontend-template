import _ from 'highland';
import { S3Connector, rejectWithFault } from 'aws-lambda-stream';

export const getObjectFromS3 = ({ // eslint-disable-line import/prefer-default-export
  debug,
  bucketName = process.env.BUCKET_NAME,
  getRequestField = 'getRequest',
  parallel = Number(process.env.S3_PARALLEL) || Number(process.env.PARALLEL) || 8,
} = {}) => {
  const connector = new S3Connector({ debug, bucketName });

  const getObject = (uow) => {
    const p = connector.getObject(uow[getRequestField])
      .then(getResponse => ({ ...uow, getResponse }))
      .catch((err) => {
        if (err.code === 'NoSuchKey') {
          return { ...uow, getResponse: { err } };
        }
        return rejectWithFault(uow)(err);
      });

    return _(p); // wrap promise in a stream
  };

  return s => s
    .map(getObject)
    .parallel(parallel);
};

