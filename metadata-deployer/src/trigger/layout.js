import { putObjectToS3 } from 'aws-lambda-stream';

const pipeline1 = options => stream => stream
  .filter(uow => uow.record.s3.object.key === 'all-mfe.json')
  .tap(print)
  .map(toPutRequest)
  .through(putObjectToS3(options))
  .tap(print(options));

const toPutRequest = uow => ({
  ...uow,
  putRequest: {
    Bucket: uow.record.s3.bucket.name,
    Key: 'layout.json',
    ACL: 'private',
    ContentType: 'application/json',
    CacheControl: 'max-age=300',
    Body: JSON.stringify(Object.values(uow.metadata)
      .filter(app => app.layout)
      .sort((a, b) => (a.layout?.order || 998) - (b.layout?.order || 999))
      .reduce((a, app) => {
        const { routes, order, ...o } = app.layout || {};

        return {
          ...a,
          ...o,
          routes: [...a.routes, ...(routes || [])],
        };
      }, { routes: [] })),
  },
});

const print = options => uow => options.debug('end: %j', uow);
// const print = uow => console.log('end: ', JSON.stringify(uow, null, 2));

export default pipeline1;
