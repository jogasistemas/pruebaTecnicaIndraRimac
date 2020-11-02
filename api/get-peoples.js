"use strict";

/**
 *
 * Route: GET /people
 */

const _ = require("underscore");

const dynamodbService = require("../services/dynamodb");
const sanitizer = require("./util/sanitizer");
const responses = require("../responses/responses");

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const limit = query && query.limit ? parseInt(query.limit) : 5;
    const last_people_id = sanitizer.getLastPeopleId(event.headers);
    const editado = sanitizer.getEditedAttribute(event.headers);
    const params = {
      Limit: limit,
    };
    if (last_people_id) {
      params.ExclusiveStartKey = { people_id: last_people_id, editado };
    }
    const data = await dynamodbService.scan(params);
    return responses.getSuccessResponse({
      items: data.Items,
      lastItem: data.LastEvaluatedKey,
    });
  } catch (error) {
    console.log("Error ", error);
    return responses.getErrorResponse(error);
  }
};
