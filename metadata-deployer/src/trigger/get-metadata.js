import { getObjectFromS3 } from '../utils';

const pipeline1 = options => stream => stream
  .map(toGetRequest)
  .through(getObjectFromS3(options))
  .map(toMetadata);
  // .tap(uow => console.log(JSON.stringify(uow, null, 2)));
  // .tap(uow => console.log('%j', uow));

const toGetRequest = uow => ({
  ...uow,
  getRequest: {
    Bucket: uow.record.s3.bucket.name,
    Key: uow.record.s3.object.key,
  },
});

const toMetadata = uow => ({
  ...uow,
  metadata: uow.getResponse.err ? {} : JSON.parse(Buffer.from(uow.getResponse.Body)),
});

export default pipeline1;
