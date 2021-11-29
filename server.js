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

    // cds.connect("db")

    cds.serve('../kubeless/srv/world').in(app);

    app.listen(PORT, () => console.info(`server listening on http://localhost:${PORT}`))

    module.exports = app;