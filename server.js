const express = require("express")
const cds = require("@sap/cds")

const { PORT = 4004 } = process.env
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/read', (req, res) => {
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
    certificate: "-----BEGIN CERTIFICATE-----\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n-----END CERTIFICATE-----\n",
    driver: "com.sap.db.jdbc.Driver",
    hdi_password: Buffer.from(process.env.HDI_PASSWORD, 'base64').toString('utf-8'),
    hdi_user: Buffer.from( process.env.HDI_USER, 'base64').toString('utf-8'),
    host: "zeus.hana.canary.eu-central-1.whitney.dbaas.ondemand.com",
    password: Buffer.from( process.env.PASSWORD, 'base64').toString("utf-8"),
    port: "53567",
    schema: "C005EC9F60334B048819721B85863A3D",
    url: "jdbc:sap://zeus.hana.canary.eu-central-1.whitney.dbaas.ondemand.com:53567?encrypt=true&validateCertificate=true&currentschema=C005EC9F60334B048819721B85863A3D",
    user: Buffer.from(process.env.USER, 'base64').toString('utf-8'),
    multiTenant: false
}; 

cds.connect(options);

// cds.serve('*').in(app);
// serve should specify the path
cds.serve('../kubeless/srv/world').in(app);

app.listen(PORT, () => console.info(`server listening on http://localhost:${PORT}`))

module.exports = app;