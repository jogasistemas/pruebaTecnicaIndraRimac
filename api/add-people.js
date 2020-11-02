"use strict";

/**
 *
 * Route: POST /people
 */

const moment = require("moment");
const _ = require("underscore");

const dynamodbService = require("../services/dynamodb");
const sanitizer = require("./util/sanitizer");
const responses = require("../responses/responses");

exports.handler = async (event) => {
  try {
    const item = JSON.parse(event.body);
    const people_id = sanitizer.getPeopleId(event.headers);
    const params = {
      ...dynamodbService.getQueryParamsByPeopleId(people_id),
    };
    const data = await dynamodbService.query(params);

    if (_.isEmpty(data.Items)) {
      item.people_id = people_id;
      item.creado = moment().format();
      item.editado = moment().format();
      await dynamodbService.put({
        Item: item,
      });
      return responses.getSuccessResponse(item);
    } else {
      return responses.getResponse(
        304,
        sanitizer.getResponseHeaders(),
        data.Items[0]
      );
    }
  } catch (error) {
    console.log("Error ", error);
    return responses.getErrorResponse(error);
  }
};
