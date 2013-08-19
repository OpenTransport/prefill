var brain = require("brain");

Prefill = function(){
    //all the possible stop areas which may turn up in a result
    this.stop_areas = {};
    this.history = [];
    // the collection from which we will learn
    this.lc = [];
    // neural network
    this.net = {};

    this.prepare = function (history_, callback){
        this.history = history_;
        this.net = new brain.NeuralNetwork();
        // Transform history into learning collection
        for(var i = 0 ; i < this.history.length ; i ++){
            var from = this.history[i].from;
            var to = this.history[i].to;
            var datetime = new Date(this.history[i].datetime);
            this.resetStopAreas();
            this.stop_areas[this.history[i].from + "|" + this.history[i].to ] = 1;
            //todo: need way better geohash
            var time = parseInt(datetime.getHours() + "" + datetime.getMinutes());
            
            this.lc[i] = {
                "input": [datetime.getDay(), time,this.history[i].location.longitude,this.history[i].location.latitude],
                "output" : this.stop_areas
            }
        }

        //this is a heavy operation
        console.info("Next info message are metrics on how good we trained our network");
        console.info(this.net.train(this.lc));
        callback();
    }

    this.guess = function(datetime, longitude, latitude){
        var time = parseInt(datetime.getHours() + "" + datetime.getMinutes());
        var output = this.net.run([datetime.getDay(), time, longitude, latitude]);

        console.log("Next info message will be the guesses of the neural network:");
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
    
    /**
     * Sets all to 0
     */
    this.resetStopAreas = function(){
        for(var i = 0 ; i < this.history.length ; i ++){
            this.stop_areas[this.history[i].from + "|" + this.history[i].to] = 0;
        }
    }
}

module.exports = Prefill;
