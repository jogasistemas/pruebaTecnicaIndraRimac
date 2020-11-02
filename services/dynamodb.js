const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.PEOPLE_TABLE;

const _params = {
  TableName: tableName,
};

const getQueryParamsByPeopleId = (people_id) => {
  return {
    IndexName: "people_id-index",
    KeyConditionExpression: "people_id = :people_id",
    ExpressionAttributeValues: {
      ":people_id": people_id,
    },
    Limit: 1,
  };
};

query = async (params) => {
  console.log("======= dynamodb service ======")
  console.log(_params)
  console.log(params)
  console.log({ ..._params, ...params })
  console.log("===============================")
  return await dynamodb.query({ ..._params, ...params }).promise();
};

put = async (params) => {
  return await dynamodb.put({ ..._params, ...params }).promise();
};

scan = async (params) => {
  return await dynamodb.scan({ ..._params, ...params }).promise();
};

module.exports = {
  query,
  put,
  scan,
  getQueryParamsByPeopleId,
};
