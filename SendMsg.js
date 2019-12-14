var open = require('amqplib').connect('amqp://localhost');

	function load()
	{
		// load messages using the id of this chat (only when startup / refresh)
		// then use rabbit mq and axios to get data. if authorized to do so.
	}

	function send(name, message, sender, reciever)
	{
		// tell server send and listen for messages if not blocked		
		open.then((conn) => {
			return conn.createChannel();
		})
		.then((ch) => {
			return ch.assertQueue(name)
			.then((ok) => {
				console.log('[MESSAGE SENT]');
				return ch.sendToQueue(
					name,
					Buffer.from(
						JSON.stringify({
							chatid: name, // unique id here to find messages by [can use queue-name should always be unique]
							from: sender,
							to:	reciever,
							date: Date.now(),
							msg: message
						})
						//Insert a document to messages (DB) here
					)
				);
			});
		})
		.catch(() => {
			console.warn;
		});
	}


module.exports = {
	send
}