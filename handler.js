const { responseHandler } = require("./helpers/responseHandler")

module.exports.handleRoot = async (event, context) => {
  return responseHandler({
    status: 'success',
    message: "Hello from root!",
  })
}

module.exports.handlePath = async (event, context) => {
  return responseHandler({
    status: 'success',
    message: 'Hello from path!'
  })
}
