/* jshint devel:true */
'use strict';

console.log('Hello I\'m the subscriber...');

// var autobahn = require('autobahn');

var connection = new autobahn.Connection({
  url: 'ws://localhost:8080/ws',
  realm: 'pubsubdemo'
});

connection.onopen = function (session) {
  console.log('Connected to WAMP router');
  function onTopic1 (args) {
    var counter = args[0];
    $('#events').append('<li>topic1 event received with counter ' + counter);
    console.log('topic1 event received with counter ' + counter);
  }
  session.subscribe('com.davideparisi.pubsubdemo.topic1', onTopic1).then(
    function (sub) {
      console.log('subscribed to topic ' + sub);
    },function (err) {
      console.log('failed to subscribe to topic', err);
    });

};

connection.onclose = function (reason) {
  console.log('Connection Lost: ' + reason);
};

connection.open();
