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
    Key: 'mount-points.json',
    ACL: 'private',
    ContentType: 'application/json',
    CacheControl: 'max-age=300',
    Body: JSON.stringify(Object.keys(uow.metadata).reduce((a1, c1) => {
      const app = uow.metadata[c1] || {};
      const mounts = app['mount-points'] || {};

      return Object.keys(mounts).reduce((a2, c2) => {
        a2[c2] = [...(a2[c2] || []), ...mounts[c2]];
        // TODO sort on order field
        // .sort((a, b) => (a.order || 999) - (b.order || 999));
        return a2;
      }, a1);
    }, {})),
  },
});

const print = options => (uow) => options.debug('end: %j', uow);
// const print = uow => console.log('end: ', JSON.stringify(uow, null, 2));

export default pipeline1;
