const { S3 } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3Upload = async (file) => {
    const s3 = new S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:   `profiles/${uuidv4}-${file.originalname}`,
        Body: file.buffer
    };

   return await s3.upload(params).promise();
};

const s3Delete = async (key) => {
    const s3 = new S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }

    return await s3.deleteObject(params).promise();
}

module.exports = {
    s3Upload,
    s3Delete
}