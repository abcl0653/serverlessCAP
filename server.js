const express = require("express")
const cds = require("@sap/cds")

const { PORT = 4004 } = process.env
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/cat', (req, res) => {
    const fs = require('fs');
    const filename = req.query.filename;
    fs.readFile(filename, 'utf8', (err, data) => {
        res.send(data);
    })
})

app.get('/ls', (req, res) => {
    const fs = require('fs');

    // directory path
    let dir = req.query.path;

    fs.readdir(dir, (err, files) => {
        if (err) {
            throw err;
        }

        res.send(files);


    })
})


cds.env.requires.db = {};  // To prevent using undefined db

let options = {};
options.kind = 'hana';
options.model = ["../kubeless/db", "../kubeless/srv"];
// options.credentials = JSON.parse(process.env.credentials);


// Options should be injected via enviroment variables
options.credentials =     {
    certificate: process.env.CERTIFICATE,
    driver: "com.sap.db.jdbc.Driver",
    hdi_password: process.env.HDI_PASSWORD,
    hdi_user: process.env.HDI_USER,
    host: "zeus.hana.canary.eu-central-1.whitney.dbaas.ondemand.com",
    password: process.env.PASSWORD,
    port: "53567",
    schema: "C005EC9F60334B048819721B85863A3D",
    url: "jdbc:sap://zeus.hana.canary.eu-central-1.whitney.dbaas.ondemand.com:53567?encrypt=true&validateCertificate=true&currentschema=C005EC9F60334B048819721B85863A3D",
    user: process.env.USER,
    multiTenant: false
}; 

cds.connect(options);

// cds.serve('*').in(app);
// serve should specify the path
cds.serve('../kubeless/srv/world').in(app);

app.listen(PORT, () => console.info(`server listening on http://localhost:${PORT}`))

module.exports = app;