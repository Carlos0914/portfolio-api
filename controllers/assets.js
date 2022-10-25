const AWS = require("aws-sdk");
const parseMultipart = require("parse-multipart");
const { responseHandler } = require("../helpers/responseHandler");

const Bucket = process.env.ASSETS_BUCKET;

const s3 = new AWS.S3();

module.exports.upload = async (event, context) => {
  try {
    // const { path: Key, data } = extractFile(event);
    const Key = "Projects/12345"
    const data = event.body
    console.log(Key)
    await s3
      .putObject({ Bucket, Key, ACL: "public-read", Body: data })
      .promise();

    return responseHandler({
      status: "success",
      image_url: `https://${Bucket}.s3.amazonaws.com/${Key}`,
    });
  } catch (err) {
    console.log(err)
    return responseHandler({
      status: "error",
      message: err.stack,
    });
  }
};

function extractFile(event) {
    console.log(event)
  const boundary = parseMultipart.getBoundary(event.headers["content-type"]);
  const parts = parseMultipart.Parse(
    Buffer.from(event.body, "base64"),
    boundary
  );
  const [{ path, data }] = parts;

  return {
    path,
    data,
  };
}
