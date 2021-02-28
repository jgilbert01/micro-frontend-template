import 'mocha';
import { expect } from 'chai';

import { handle } from '../../../src/trigger';

describe('trigger/index.js', () => {
  before(() => {
    require('baton-vcr-replay-for-aws-sdk'); // eslint-disable-line global-require
  });

  it('should test trigger integration for app mfe file', async () => {
    const res = await handle(MAIN_MFE_EVENT, {});
    expect(res).to.equal('Success');
  });

  it('should test trigger integration for all mfe file', async () => {
    const res = await handle(ALL_MFE_EVENT, {});
    expect(res).to.equal('Success');
  });
});

const MAIN_MFE_EVENT = {
  Records: [
    {
      messageId: '0e71562d-befa-4e60-876a-d9cc44e0535d',
      receiptHandle: 'AQEBgYDcil+eVBLrKVVjVuVy19MfzdVXhpz1iG8JydYFudWssjm8aUrI2/Jn7rn/llK1cTRey2zQ+OAFxuJF/24A0hpUra27/r4UXuxSvTpxdfUhOAdjhHX+GG3zFWi/HghC/pXTNqRdhkfnvY6MF/ykHWTKQ1jX8VKVGxCXZpeGgUqAILoEqEN5hRPYTZFfzzaLNz4LZmkBHDvosCXM+WWBRBOVAeTV+c9/39JGgAbumVgfXoYI0ajZb3cCmSzLwO3p5MwPR5K7Q1gHu/+CYJM4Z13moAMrlfaZk/xksSRGhOF5NHrTx4bmFyFRiyLtxiMXvnsqfuCWgDFgAsq2ExCYPkYZRYk0M1awrIpbG1us5oa3p+NF5RYnfj34pI+EsuCVDhpCXonvw5DiJ0zZpYCCPNKCmKnfRo5daqBK+ozILTtbSRIQRa0/1PMwzM1sdXjC',
      body: '{\n  "Type" : "Notification",\n  "MessageId" : "43d05c24-b26e-552e-8679-04810fb365ed",\n  "TopicArn" : "arn:aws:sns:us-east-1:026257137139:mfe-main-stg-metadata-topic",\n  "Subject" : "Amazon S3 Notification",\n  "Message" : "{\\"Records\\":[{\\"eventVersion\\":\\"2.1\\",\\"eventSource\\":\\"aws:s3\\",\\"awsRegion\\":\\"us-east-1\\",\\"eventTime\\":\\"2021-02-16T12:33:24.880Z\\",\\"eventName\\":\\"ObjectCreated:Put\\",\\"userIdentity\\":{\\"principalId\\":\\"AWS:AIDAQMHIMDXZUZ24KCFNF\\"},\\"requestParameters\\":{\\"sourceIPAddress\\":\\"173.66.80.214\\"},\\"responseElements\\":{\\"x-amz-request-id\\":\\"F1299AFE13C549F3\\",\\"x-amz-id-2\\":\\"0pRQ8WUagn0rmBk1fufdSuMN+e66vAj77GEVGor0+9H/ixI8TSERbgU91piV04jRR5J4oKbznJvRNX03QgXMMviqEO+9NKe/tck0TOfZaB0=\\"},\\"s3\\":{\\"s3SchemaVersion\\":\\"1.0\\",\\"configurationId\\":\\"c2a9f34a-1968-4167-b129-c6d5a4ca1225\\",\\"bucket\\":{\\"name\\":\\"mfe-main-stg-websitebucket-wrivy8kb9743\\",\\"ownerIdentity\\":{\\"principalId\\":\\"A33VIG69HLWPQP\\"},\\"arn\\":\\"arn:aws:s3:::mfe-main-stg-websitebucket-wrivy8kb9743\\"},\\"object\\":{\\"key\\":\\"mfe-main/stg/mfe.json\\",\\"size\\":1345,\\"eTag\\":\\"fb01bb53ca3ff1d1700b799dd0f86d93\\",\\"sequencer\\":\\"00602BBB9B8070806C\\"}}}]}",\n  "Timestamp" : "2021-02-16T12:33:33.131Z",\n  "SignatureVersion" : "1",\n  "Signature" : "Qv5EfA85m2w8lsguAEMa0gmI/YYM/gAZcyyJ32xBFjI7qtssZYex93fVuFp0h9Xq40VlLT6CE1itK2GxzBCPBjRH1x3hACEisc1c64YmB1JZUmlAvfK/cBaqa5EUGxHi5nuc2dxb/el0EBe4cIIjGnDR+vI/kTB/RGNrN+40h5MGoxIm3Mqbu5Ib4T0hB96UZ+lJZUgm/CmNrsXerrQpXBCE006hgD2J3sq6zdRMEifNlGSsXD/SVPIFE1I5umCbTEU/dT3Qb7Y1PISGbuEqMzLnTzAosySz9P2BDC7fXpEKmXKi9UNlXnzn3gkOUVGFnukS0zijGzfKW4q/9iMNWQ==",\n  "SigningCertURL" : "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-010a507c1833636cd94bdb98bd93083a.pem",\n  "UnsubscribeURL" : "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:026257137139:mfe-main-stg-metadata-topic:3bfec31c-0ba5-41a3-9c43-c274a2ad501c"\n}',
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1613478813187',
        SenderId: 'AIDAIT2UOQQY3AUEKVGXU',
        ApproximateFirstReceiveTimestamp: '1613478813200',
      },
      messageAttributes: {},
      md5OfBody: 'bb23c06577a5d852a162803c0a6f3fb2',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:us-east-1:026257137139:mfe-metadata-deployer-stg-Queue-1DFHTK2TBQSF2',
      awsRegion: 'us-east-1',
    },
  ],
};

const ALL_MFE_EVENT = {
  Records: [
    {
      messageId: 'a9e6e9e5-95ce-4bc9-8e5e-5fa5885f9db4',
      receiptHandle: 'AQEB3OY2HanTeKRMq4YGNxDgnR8o9qvHisLcZ6Jn85yi1q9mPj0Lj92XHtOX1A6jnp2AefVmCxxxR4f32HvffE5ZcymzYC6wMhLQVQzWE1Fd6h1YwANZxdNj2pCNINnjVLr29VCBVUgFJUgsyHCoHrVq1Fi39VBtLxHMeRIenoGrn4Dv23n14elOSduLB/zTD8KTKH1CxSfpLzwDnnTN5kC95PfrnnBXpltzQFMQ/8CfcyGeiSJu8Qnq5mhQskdxA18ZdxAP2sUOYa2Eq+b57qZyqNQlvETuL2F7NoLFLoPZnpzy+ZSeVFk7WGS6XwOz0Qza2PtyZ/HneiokAH3/pf6G9ypybmYA+sa/FZcT8iqVjU0x5kxyFVr2NEAwh129kLzRsT3qQA+AvRBdIh8HnmJXGjAi2dzP4lm+IShK+LD4eNDJFzmDShvmXTGiCrtl5Fwh',
      body: '{\n  "Type" : "Notification",\n  "MessageId" : "d1a987ce-3e44-5bf3-8dc8-df6bc982dd2d",\n  "TopicArn" : "arn:aws:sns:us-east-1:026257137139:mfe-main-stg-metadata-topic",\n  "Subject" : "Amazon S3 Notification",\n  "Message" : "{\\"Records\\":[{\\"eventVersion\\":\\"2.1\\",\\"eventSource\\":\\"aws:s3\\",\\"awsRegion\\":\\"us-east-1\\",\\"eventTime\\":\\"2021-02-16T16:40:35.780Z\\",\\"eventName\\":\\"ObjectCreated:Put\\",\\"userIdentity\\":{\\"principalId\\":\\"AWS:AIDAQMHIMDXZUZ24KCFNF\\"},\\"requestParameters\\":{\\"sourceIPAddress\\":\\"173.66.80.214\\"},\\"responseElements\\":{\\"x-amz-request-id\\":\\"DBE99D608EC741C1\\",\\"x-amz-id-2\\":\\"qiIdghMegfmYWd5q4zRZw5pCopUCE6ueKTp+6qb3SdPhAwOJ4zzkx60uZa0cWG+DqH/19gIzJ0ydW3By1G6flxhpsvswQ9hY\\"},\\"s3\\":{\\"s3SchemaVersion\\":\\"1.0\\",\\"configurationId\\":\\"c2a9f34a-1968-4167-b129-c6d5a4ca1225\\",\\"bucket\\":{\\"name\\":\\"mfe-main-stg-websitebucket-wrivy8kb9743\\",\\"ownerIdentity\\":{\\"principalId\\":\\"A33VIG69HLWPQP\\"},\\"arn\\":\\"arn:aws:s3:::mfe-main-stg-websitebucket-wrivy8kb9743\\"},\\"object\\":{\\"key\\":\\"all-mfe.json\\",\\"size\\":641,\\"eTag\\":\\"ee34d7a38b45e63b4b1fa9ef0483370e\\",\\"sequencer\\":\\"00602BF584DD7DB5CF\\"}}}]}",\n  "Timestamp" : "2021-02-16T16:40:38.534Z",\n  "SignatureVersion" : "1",\n  "Signature" : "IU/aMpwht7l3/vp/GZ7VxRJE36qrZ0SaackfmNjPbJVoL9/E0wkTzMkvqpcIErBeD4tssJwE7ssFH6zqKVcKhTevEqpjl5C/aBPf08kKvZHBAttwrhqDBVVoxbLXHCLY2Kxj0Z3dccONMbAcR2c2wThoPi9oXVPbtejCgY7jz3y4FDl4uHPYCRW+XY+Y8zLh6XVdAdcSlg2Zn9SOIXyEdmKB2A/IAApFCgg2aIsBwO6CNEnH3Pwj5NYBrSpqLDY2Cb6vkOeh2s3gbmf7wyA8GdSEK4SGpE2VIGzx1fKJ0KB2jcFxR+XM4N7RLaayEspm4Vcem8g3t/Q8J+P4xrglBg==",\n  "SigningCertURL" : "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-010a507c1833636cd94bdb98bd93083a.pem",\n  "UnsubscribeURL" : "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:026257137139:mfe-main-stg-metadata-topic:3bfec31c-0ba5-41a3-9c43-c274a2ad501c"\n}',
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1613493638585',
        SenderId: 'AIDAIT2UOQQY3AUEKVGXU',
        ApproximateFirstReceiveTimestamp: '1613493638593',
      },
      messageAttributes: {},
      md5OfBody: '0501e827c4ae3ecab6b61aef56a8d6e0',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:us-east-1:026257137139:mfe-metadata-deployer-stg-Queue-1DFHTK2TBQSF2',
      awsRegion: 'us-east-1',
    },
  ],
};
