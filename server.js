const express = require("express")
const cds = require("@sap/cds")

const { PORT=4004 } = process.env
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))


// cds.connect("db")
cds.serve("all").in(app)

app.listen (PORT, ()=> console.info(`server listening on http://localhost:${PORT}`))

module.exports = app;