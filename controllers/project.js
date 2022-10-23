const DBApiRequest = require("../database/dbApi")

module.exports.getById = async (event, context) => {
    const { id } = event.pathParameters
    const response = await DBApiRequest("projects", "findById", id)
    const project = await response.json()
    return {
        status: 'success',
        project: project.document
    }
}

module.exports.get = async (event, context) => {
    let { page = "1", limit = "10" } = event.queryStringParamaters || {}
    page = parseInt(page)
    limit = parseInt(limit) 
    const response = await DBApiRequest("projects", "find", { skip: (page-1)*limit, limit})
    const projects = await response.json()
    return {
        status: 'success',
        projects: projects.documents
    }
}

module.exports.create = async (event, context) => {
    const body = JSON.parse(event.body)
    const response = await DBApiRequest("projects", "insertOne", body)
    const project = await response.json()
    return {
        status: 'success',
        project
    }
}