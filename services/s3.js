const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadToBucket = (bucketName,file) => {
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:file.data
    };
    return storage.upload(params).promise();
};

module.exports = {
    uploadToBucket
};