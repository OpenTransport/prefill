#!/usr/bin/env node
// This is a node.js application. Run with ./main.js

// It is example code for Prefill.js
var prefill = require("./prefill.js");

//Dummy data
var history = [
    {
        "datetime" : "2013-08-31T02:20Z", // iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 3.14,
            "latitude" : 51.2
        },
        "from" : "http://stations.io/exampleidentifier1",
        "to" : "http://stations.io/exampleidentifier2"
    },
    {
        "datetime" : "2013-08-31T02:20Z", // iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 3.14,
            "latitude" : 51.1
        },
        "from" : "http://stations.io/exampleidentifier4",
        "to" : "http://stations.io/exampleidentifier1"
    },
    {
        "datetime" : "2013-08-19T16:56Z", // iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 3.14,
            "latitude" : 51.0
        },
        "from" : "http://stations.io/exampleidentifier1",
        "to" : "http://stations.io/exampleidentifier4"
    },    {
        "datetime" : "2013-08-31T02:20Z", // iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 3.14,
            "latitude" : 51.2
        },
        "from" : "http://stations.io/exampleidentifier1",
        "to" : "http://stations.io/exampleidentifier2"
    },
    {
        "datetime" : "2013-08-31T02:20Z", // iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 2.14,
            "latitude" : 50.1
        },
        "from" : "http://stations.io/exampleidentifier4",
        "to" : "http://stations.io/exampleidentifier1"
    }
]

var p = new prefill();
p.prepare(history, function(){
    var datetime = new Date();
    console.log(p.guess(datetime,51.2, 3.14));
});
