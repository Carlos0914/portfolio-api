module.exports.handleRoot = async (event, context) => {
  return {
    status: 'success',
    message: "Hello from root!",
  }
}

module.exports.handlePath = async (event, context) => {
  return {
    status: 'success',
    message: 'Hello from path!'
  }
}
