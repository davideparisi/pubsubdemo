var autobahn = require('autobahn');

var connection = new autobahn.Connection({
    url: 'ws://localhost:8080/ws',
    realm: 'pubsubdemo'
});

connection.onopen = function (session) {
    var counter = 0;
    setInterval(function () {
        // Publish an event
        session.publish('com.davideparisi.pubsubdemo.topic1', [counter]);
        console.log("published to 'topic1' with counter " + counter);
        // increase counter by 1
        counter += 1;
    },1000);
};

connection.open();