const express = require("express")
const cds = require("@sap/cds")

const { PORT = 4004 } = process.env
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/ls', (req, res) => {
    const fs = require('fs');

    // directory path
    console.log("==========query=======");
    console.log(req.query);
    let dir = req.query.path;
    dir = './' + dir;

    // list all files in the directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            throw err;
        }

        res.send(files);

        //     // files object contains all files names
        //     // log them on console
        //     files.forEach(file => {
        //         console.log(file);
        //     });
        // }); 
    })
})

    // cds.connect("db")

    const all = cds.resolve('*', {});
    console.log("========all==========all===========all======");
    console.log(all);


    // const fs = require('fs');

    // // directory path
    // const dir = './';

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


    cds.serve("all").in(app)

    app.listen(PORT, () => console.info(`server listening on http://localhost:${PORT}`))

    module.exports = app;