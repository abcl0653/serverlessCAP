const serverlessExpress = require('@vendia/serverless-express');
const app = require('./server');

exports.main = serverlessExpress({app})