const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");

const LoadRongcloudServer = require("../calllib-v3/server");

const app = express();
const key = fs.readFileSync("../config/wildcard.wrtc.dev.pem", "utf-8");
const cert = fs.readFileSync("../config/wildcard.wrtc.dev.crt", "utf-8");

LoadRongcloudServer(app);

app.use('/publisher', express.static('../publisher/dist/'));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/demo', express.static(path.join(__dirname, '../calllib-v3/web')));

app.use(express.static('dist'));

const httpsServer = https.createServer({key, cert}, app);

httpsServer.listen(8443, (err)=>{
    console.log("https://dimgai.wrtc.dev:8443");
});