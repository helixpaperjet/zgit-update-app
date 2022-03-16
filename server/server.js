const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(
    cors({
        origin: "*"
    })
    );
const confRead = fs.readFileSync(`${__dirname}/config.json`).toString();console.log(confRead);
const config = JSON.parse(confRead);
const prefixPublicPages = `${config.publicRoot}/pages`;
const port = config.port;
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Resolve get home page
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(`${req.ip} // GET_HOME_PAGE\n`);
    res.sendFile(`${prefixPublicPages}/input-en.html`);
})
// Resolve data query
app.get("/data/test/:id", (req, res) => {
    console.log(`${req.ip} // GET_TEST_DATA`);
    var id = req.params.id;
    var data = fs.readFileSync(`${config.dataRoot}/${id}.json`);
    console.log(`GET_TEST_DATA: 200 OK => Successfully read "${__dirname}/data/test/${id}.json"`);
    res.write(data);
    res.send();
    console.log(`GET_TEST_DATA: 200 OK => Successfully sent result data\n`)
})
// Resolve get about page
app.get("/about", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(`${req.ip} // GET_ABOUT_PAGE`);
    res.sendFile(`${prefixPublicPages}/about.html`);
})
// Resolve data change request
app.post("/data/test/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(`${req.ip} // POST_DATA_CHANGE`);
    var target = req.params.id;
    console.log(`POST_DATA_CHANGE: 200 OK => Identified file: ${target}.json`);
    fs.writeFileSync(`${__dirname}/data/test/${target}.json`, JSON.stringify(req.body));
    console.log(`POST_DATA_CHANGE: 200 OK => ${target}.json successfully overwritten\n`);
    res.send("ok");
})
app.post("/new/:id", (req, res) => {})
// Resolve key query, implemented in accordance with tianqi's PHP api
app.get("/key/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(`${req.ip} // GET_KEY`);
    let keyOwner = req.params.id;
    console.log(`GET_KEY: 200 OK => keyOwner = ${keyOwner}`);
    let keyDataBuffer = fs.readFileSync(`${config.keyMasterFile}`);
    console.log(`GET_KEY: 200 OK => keyDataFile successfully read`);
    let keyData = JSON.parse(keyDataBuffer);
    console.log(`GET_KEY: 200 OK => keyData successfully read`);
    let key = keyData[`${keyOwner}`];
    console.log(`GET_KEY: 200 OK => key (${keyOwner}) = ${key}`);
    res.send(key);
    console.log(`GET_KEY: 200 OK => Key ${key} successfully sent\n`);
})
app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port.toString()}`);
})