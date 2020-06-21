import AWS = require('aws-sdk');
import { config } from '../../../../config/config';

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws.reigion,
  params: {Bucket: config.aws.media_bucket}
});


export function getGetSignedUrl( key: string ): string{
  if (!key) {
    return null;
  }

  const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: config.aws.media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
      });

    return url;
}


export function getPutSignedUrl( key: string ){

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('putObject', {
      Bucket: config.aws.media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return url;
}