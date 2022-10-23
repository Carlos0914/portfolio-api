const DBApiRequest = require("../database/dbApi")

module.exports.getById = async (event, context) => {
    const { id } = event.pathParameters
    const project = await DBApiRequest("projects", "findById", id)
    return {
        status: 'success',
        project: project.document
    }
}

module.exports.get = async (event, context) => {
    let { page = "1", limit = "10" } = event.queryStringParamaters
    page = parseInt(page),
    limit = parseInt(limit) 
    const projects = await DBApiRequest("projects", "find", { skip: (page-1)*limit, limit})
    return {
        status: 'success',
        projects: projects.documents
    }
}

module.exports.create = async (event, context) => {
    const body = JSON.parse(event.body)
    const project = await DBApiRequest("projects", "insertOne", body)
    return {
        status: 'success',
        project
    }
}