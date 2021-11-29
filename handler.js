require('source-map-support/register')
const serverlessExpress = require('./vendia/serverless-express');
const app = require('./server');

const world = require('./srv/world');
// const app = require('./server');




let serverlessExpressInstance

function asyncTask() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('connected to database'), 1000)
    })
}

async function setup(event, context) {
    const asyncValue = await asyncTask()
    console.log(asyncValue)
    serverlessExpressInstance = serverlessExpress({ app })
    return serverlessExpressInstance(event, context)
}
// const fs = require('fs');

// // directory path
// const dir = './node_modules/';

// console.log("handler======");
// // list all files in the directory
// fs.readdir(dir, (err, files) => {
//     if (err) {
//         throw err;
//     }

//     // files object contains all files names
//     // log them on console
//     files.forEach(file => {
//         console.log(file);
//     });
// });

function handler(event, context) {

    // console.log(event);
    // console.log(context);
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

    return setup(event, context)
}

exports.main = handler;



// exports.main = serverlessExpress(app);