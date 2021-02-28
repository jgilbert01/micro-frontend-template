import { putObjectToS3 } from 'aws-lambda-stream';

import { getObjectFromS3 } from '../utils';

const FILE_NAME = 'all-mfe.json';

// TODO delete an mfe

const pipeline1 = options => stream => stream
  .filter(uow => uow.record.s3.object.key !== FILE_NAME)
  .map(toGetRequest)
  .through(getObjectFromS3(options))
  .map(toMetadata)
  .map(toPutRequest)
  .through(putObjectToS3(options))
  .tap(print(options));

const toGetRequest = uow => ({
  ...uow,
  getRequest: {
    Bucket: uow.record.s3.bucket.name,
    Key: FILE_NAME,
  },
});

const toMetadata = uow => ({
  ...uow,
  apps: uow.getResponse.err ? {} : JSON.parse(Buffer.from(uow.getResponse.Body)),
});

const toPutRequest = uow => ({
  ...uow,
  putRequest: {
    Bucket: uow.record.s3.bucket.name,
    Key: FILE_NAME,
    ACL: 'private',
    ContentType: 'application/json',
    Body: JSON.stringify({
      ...uow.apps,
      [`${uow.metadata.orgName}-${uow.metadata.projectName}`]: uow.metadata,
    }),
  },
});

const print = options => uow => options.debug('end: %j', uow);
// const print = uow => console.log('end: ', JSON.stringify(uow, null, 2));

export default pipeline1;
