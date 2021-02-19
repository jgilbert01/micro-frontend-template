import { putObjectToS3 } from 'aws-lambda-stream';

const pipeline1 = options => stream => stream
  .filter(uow => uow.record.s3.object.key === 'all-mfe.json')
  .map(toPutRequest)
  .through(putObjectToS3(options))
  .tap(print(options));

const toPutRequest = uow => ({
  ...uow,
  putRequest: {
    Bucket: uow.record.s3.bucket.name,
    Key: 'importmap.json',
    ACL: 'private',
    ContentType: 'application/json',
    CacheControl: 'max-age=300',
    Body: JSON.stringify({
      imports: Object.keys(uow.metadata).reduce((a, c) => {
        const app = uow.metadata[c] || {};
        return { ...a, ...(app.imports || {}) };
      }, {}),
    }),
  },
});

const print = options => uow => options.debug('end: %j', uow);
// const print = options => uow => console.log('end: ', JSON.stringify(uow, null, 2));

export default pipeline1;
