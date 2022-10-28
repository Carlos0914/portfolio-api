const DBApiRequest = require("../database/dbApi");
const { responseHandler } = require("../helpers/responseHandler");

module.exports.getById = async (event, context) => {
  const { id } = event.pathParameters;
  const response = await DBApiRequest("technologies", "findById", id);
  const technology = await response.json();
  return responseHandler({
    status: "success",
    technology: technology.document,
  });
};

module.exports.get = async (event, context) => {
  let { page = "1", limit = "10" } = event.queryStringParamaters || {};
  page = parseInt(page);
  limit = parseInt(limit);
  const response = await DBApiRequest("technologies", "find", {
    skip: (page - 1) * limit,
    limit,
  });
  const technologies = await response.json();
  return responseHandler({
    status: "success",
    technologies: technologies.documents,
  });
};

module.exports.create = async (event, context) => {
  const body = JSON.parse(event.body);
  const response = await DBApiRequest("technologies", "insertOne", body);
  const technologies = await response.json();
  return responseHandler({
    status: "success",
    technologies,
  });
};
