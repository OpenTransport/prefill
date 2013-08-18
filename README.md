# Prefill #

Prefill is a javascript library to guess what an end-user wants to have filled out in a journey planner form.

The goal of prefill is to fill the "from" and "to" box in online journey planners so the user only has to check the fields and click "ok".

## Why did I make this

Because a lot of journey planners exist, yet they all fail at delivering the simple user experience that a user would expect: prefill what a user will probably fill out.

## Usage ##

We need the history in a certain format. Without further ado, this is an example of the only format we accept at this moment:

```javascript
history = [
    {
        "datetime" : "2013-08-31T2:20Z",//iso8601
        "location" : { // the location of the user when it performed the action
            "longitude" : 3.14,
            "latitude" : 51.2
        },
        "from" : "http://stations.io/exampleidentifier1",
        "to" : "http://stations.io/exampleidentifier2"
    }//,
    //...
]

```

The history array will be used as the input for prefill:

```javascript
p = new Prefill();
//this is a quite intense operation depending on how fast our neural network learns (oh yes, we're using a neural network)
p.prepare(history, function(){
    //this operation is okay
    result = p.guess("2013-08-31T2:20Z","longitude" : 3.14,"latitude" : 51.2);
    console.log("I think " + result.to + " and " + result.from + " are the desired values");
});

```

## How it works ##

The history should be available on client side (e.g. in LocalStorage).

The history will be used to get all the necssary variables to train a neural network:

 * Day of the week
 * Day of the year
 * Hours concatenated with minutes
 * round(longitude,2)*100 . round(latitude,2) of the user

and of course the "from" and "to" are included when training.

Since the history will probably contain only 10 to 20 from/to stop areas, the neural network might be quite precise.

For the neural network, we will use [brain.js](https://github.com/harthur/brain).

### Being smarter ###

In some cases we can be smarter than the neural network.

This happens when:
 * the user's query history contains exactly 1 lookup in the near future (I suggest a timeframe of 2 hours). Because: a user may look up a certain route in the future and recheck the route when time approaches
 * _more?_

### Synchronizing the history ###

The history can be synchronized with a online user account. This is not necessary as everything can be stored in localstorage on client side. 

## License

MIT
