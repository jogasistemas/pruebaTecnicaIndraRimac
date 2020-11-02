const { getResponseHeaders } = require("../api/util/sanitizer");

getResponse = (statusCode = 200, headers = getResponseHeaders(), body) => {
    console.log("===== getResponse =====")
    console.log(body)
    return {
        statusCode,
        headers,
        body: JSON.stringify(body),
    } 
}

getSuccessResponse = (body) => {
    return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: JSON.stringify(body),
    }
}

getErrorResponse = (error) => {
    return {
        statusCode: error.statusCode ? error.statusCode : 500,
        headers: getResponseHeaders(),
        body: JSON.stringify({
          error: error.name ? error.name : "Exception",
          message: error.message ? error.message : "Unknown error"
        })
      }
}

module.exports = {
    getResponse,
    getSuccessResponse,
    getErrorResponse,
}