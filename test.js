#!/usr/bin/env node
// This is a node.js application. Run with ./main.js

// It is example code for Prefill.js
var prefill = require("./js/prefill.js");
//Dummy data
var history = require("./examples/commuter.json")

var p = new prefill();
p.prepare(history, function(){
    var datetime = new Date();//"2013-08-15T07:20Z");
    console.log(p.guess(datetime,51.2, 3.14));
});
