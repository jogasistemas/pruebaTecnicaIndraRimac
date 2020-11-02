"use strict";

/**
 *
 * Route: GET /people/${people_id}
 */

const AWS = require("aws-sdk");
const axios = require("axios");
AWS.config.update({ region: "us-east-1" });

const dynamodbService = require("../services/dynamodb");
const _ = require("underscore");

const util = require("./util/sanitizer");
const responses = require("../responses/responses");
const { ROOT_URL } = require("./util/constants")

exports.handler = async (event) => {
  try {
    const people_id = decodeURIComponent(event.pathParameters.people_id);
    const params = {
     ...dynamodbService.getQueryParamsByPeopleId(people_id),
    };
    const data = await dynamodbService.query(params);
    console.log("==== reponse1 ====");
    console.log(data);

    if (!_.isEmpty(data.Items)) {
      return responses.getSuccessResponse(data.Items[0]);
    } else {
      const response = (await axios.get(`${ROOT_URL}${people_id}`)).data;
      const convertedResponse = util.convertAttributes(response, people_id);
      const params = {
        Item: convertedResponse,
      };
      const itemCreated = await dynamodbService.put(params);
      if (itemCreated != null) {
        return responses.getSuccessResponse(convertedResponse);
      } else {
        return responses.getErrorResponse({
          message: "Ocurrió un error al intentar crear un nuevo documento",
        });
      }
    }
  } catch (error) {
    console.log("Error ", error);
    return responses.getErrorResponse(error);
  }
};
