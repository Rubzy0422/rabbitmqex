var express = require('express');
var app = express();
var port = 3001;
var open = require('amqplib').connect('amqp://localhost');
 
// Publisher
var q = 'tasks';

open.then(function(conn) {
	return conn.createChannel();
}).then(function(ch) {
	return ch.assertQueue(q).then(function(ok) {
		return ch.sendToQueue(q, Buffer.from('something to do'));
	});
}).catch(console.warn);

// Consumer
open.then(function(conn) {
	return conn.createChannel();
}).then(function(ch) {
	return ch.assertQueue(q).then(function(ok) {
		return ch.consume(q, function(msg) {
			if (msg !== null) {
				console.log(msg.content.toString());
				ch.ack(msg);
			}
		});
	});
}).catch(console.warn);

app.listen(port, () => console.log(`App listening on port ${port}`));