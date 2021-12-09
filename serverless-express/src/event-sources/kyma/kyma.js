const url = require('url')
const { getEventBody, getCommaDelimitedHeaders } = require('../utils')

function getRequestValuesFromApiGatewayEvent ({ event }) {
  delete event.extensions.request.headers['if-none-match']; // workaround

  return event.extensions.request;

}

function getResponseToApiGateway ({
  statusCode,
  body,
  headers = {},
  isBase64Encoded = false,
  response = {}
}) {

  return body;
}

module.exports = {
  getRequest: getRequestValuesFromApiGatewayEvent,
  getResponse: getResponseToApiGateway
}
