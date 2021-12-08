const handler = require('./handler');


const request = require('express/lib/request');
const response = require('express/lib/response');

// request.request()
request.path = "./";
let event = {extensions: {request:request, response: response}};
let context = {}; 
handler.main(event, context);
