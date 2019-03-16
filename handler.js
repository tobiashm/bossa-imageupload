'use strict';
const AWS = require('aws-sdk');

const Bucket = 'sydtur2019-imageupload';
const AllowOrigin = 'https://s3.eu-west-3.amazonaws.com';

const KeyPrefix = () => new Date().toISOString().replace(/-|T|:|\.\d{3}Z$/g, '');

module.exports.requestUploadURL = async (event, context) => {
  const s3 = new AWS.S3();
  const params = JSON.parse(event.body);
  const Key = `${KeyPrefix()}_${params.name}`;

  const s3Params = {
    Bucket,
    Key,
    ContentType: params.type,
    ACL: 'public-read',
  };

  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': AllowOrigin
    },
    body: JSON.stringify({ uploadURL, Key }),
  };
};
