// importing event class
var events = require('events');



// creating event object
var eventEmitter = new events.EventEmitter();

var myCallback = function(data){
    console.log('got data : '+data);
}

//registering user defined event
eventEmitter.on('tanEvent',myCallback);

// defining user defined event 
var fn = function(){

    eventEmitter.emit('tanEvent','Data from emitter');

}

// calling to the function
fn();



