var brain = require("brain");

Prefill = function(options){
    this.options = options || {};
    //all the possible stop areas which may turn up in a result
    this.stop_areas = {};
    this.history = [];
    // the collection from which we will learn
    this.lc = [];
    // neural network
    this.net = {};

    this.normalizeInput = function(datetime, location){
        //concatenate time in 1 integer
        var time = parseInt(datetime.getHours() + "" + datetime.getMinutes() / 60 * 100);
        return {
            // The day of the week /6 (Sunday = 0, Monday= 1/6, Tuesday = 1/3 ... Saturday = 1
            day : datetime.getDay() / 6,
            // The time of the day can be divided by 2400
            time: time / 2400,
            longitude: (location.longitude + 90) / 180,
            latitude: (location.latitude + 90) / 180,
        }
    }

    this.prepare = function (history_, callback){
        this.history = history_;
        this.net = new brain.NeuralNetwork();
        // Transform history into learning collection
        for(var i = 0 ; i < this.history.length ; i ++){
            var from = this.history[i].from;
            var to = this.history[i].to;
            var datetime = new Date(this.history[i].datetime);
            //set the found route to 1 for this situation
            var out = {};
            out[from + "|" + to] = 1;
            //add the in and outs to the learning collection
            this.lc[i] = {
                "input": this.normalizeInput(datetime,this.history[i].location ),
                "output" : out
            }
        }
        //this is a heavy operation
        if(this.options.logging)
            console.info("Metrics on how good we trained our network:");
        var feedback = this.net.train(this.lc, {
            errorThresh: 0.05,  // error threshold to reach
            iterations: 20000,   // maximum training iterations
            log: this.options.logging,          // console.log() progress periodically
            logPeriod: 10        // number of iterations between logging
        });

        if(this.options.logging)
            console.info(feedback);
        callback();
    }

    this.guess = function(datetime, longitude, latitude){
        var output = this.net.run(this.normalizeInput(datetime,{"longitude": longitude, "latitude": latitude}));
        console.log("Result of the neural network:");
        console.log(output);
        //find the best result
        var max = 0;
        var winners = [];
        for(var route in output){
            if(output[route] > max){
                winners = route.split("|");
                max = output[route];
            }
        }
        return {
            from : winners[0],
            to : winners[1]
        }
    }
}

module.exports = Prefill;
