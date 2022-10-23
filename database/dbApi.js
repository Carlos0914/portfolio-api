const settings = {
  baseURL: process.env.MONGODB_DATA_API_URL,
  apiKEY: process.env.MONGODB_DATA_API_KEY,
  dataSource: process.env.MONGODB_DATA_SOURCE,
  dbName: process.env.DB_NAME,
};

const DBApiRequest = async (collection, action, body) => {
  let documentParams;
  switch (action) {
    case "findById":
      if (typeof body !== "string") {
        return {
          status: "error",
          message: `Invalid body type (expected string, found ${typeof body})`,
        };
      }
      documentParams = {
        filter: { _id: { $oid: body } },
      };
      break;
    case "findOne":
      documentParams = {
        filter: body.filter || {},
        projection: body.projection || {},
      };
    case "find":
      documentParams = {
        filter: body.filter || {},
        projection: body.projection || {},
        sort: body.sort || {},
        limit: body.limit || 10,
        skip: body.skip || 0,
      };
      break;
    case "insertOne":
      documentParams = {
        document: body,
      };
      break;
    case "insertMany":
      documentParams = {
        documents: body,
      };
      break;
    case "update":
      documentParams = {
        filter: body.filter || {},
        update: {
          $set: body.params,
        },
        upsert: body.upsert || false,
      };
      break;
    case "delete":
      documentParams = {
        filter: body,
      };
    default:
      return {
        status: "error",
        message: "Invalid action!",
      };
  }

  data = JSON.stringify({
    collection: collection,
    database: settings.dbName,
    dataSource: settings.dataSource,
    ...documentParams,
  });

  return fetch(
    `${settings.baseURL}/${action === "findById" ? "findOne" : action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": settings.apiKEY,
      },
      data,
    }
  );
};

module.exports = DBApiRequest;
