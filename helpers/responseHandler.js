const responseHandler = (responseObj) => {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(responseObj),
  };
};

module.exports = { responseHandler };
