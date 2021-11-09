const express = require('express');
const bodyParser = require("body-parser");
const Burrito = require("./burrito");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));


app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

var myOrders = {};

app.post("/sms", (req, res) => {
    var sFrom = req.body.From || req.body.from;
    if (!myOrders.hasOwnProperty(sFrom)) {
        myOrders[sFrom] = new Burrito();
    }

    var message = req.body.Body || req.body.body;
    var reply = myOrders[sFrom].handleInput(message);
    if (myOrders[sFrom].isDone()) {
        delete myOrders[sFrom];
    }
    res.setHeader('content-type', 'text/xml');
    var myResponse = "<Response>";
    for (var n = 0; n < reply.length; n++) {
        myResponse += "<Message>";
        myResponse += reply[n];
        myResponse += "</Message>";
    }
    res.end(myResponse + "</Response>");
});



var port = process.env.PORT || parseInt(process.argv.pop()) || 8090;

app.listen(port);

console.log('It works.. place your order at 8090....');