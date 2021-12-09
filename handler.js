const serverlessExpress = require('./serverless-express');
const app = require('./server');

exports.main = serverlessExpress({app});
