const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { responseHandler } = require("../helpers/responseHandler");
const moment = require("moment");

const Bucket = process.env.ASSETS_BUCKET;
const URL_EXPIRATION_SECONDS = 60;
const s3Client = new S3Client();

module.exports.getSecureUploadURL = async (event, context) => {
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const aux = JSON.parse(event.body).path.split(".");
  if (aux.length >= 2) {
    aux[aux.length - 2] += `-${timestamp}`;
  }
  const Key = aux.join(".");

  const command = new PutObjectCommand({
    Bucket,
    Key,
    ACL: 'public-read'
  });
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: URL_EXPIRATION_SECONDS,
  });

  const assetUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`;

  return responseHandler({
    status: "success",
    signedUrl,
    assetUrl,
  });
};
