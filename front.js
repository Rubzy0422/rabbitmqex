var open = require('amqplib').connect('amqp://localhost');
	// on recieve update {{FRONTEND SCRIPT}}
	function recieve(name)
	{
		open.then((conn) => 
		{
			return conn.createChannel();
		})
		.then((ch) => {
			return ch.assertQueue(name)
			.then((ok) => {
				return ch.consume(name, (msg) =>
				{
					if (msg !== null) {
						console.log(JSON.parse(msg.content));
						ch.ack(msg);
					}
				});
			});
		}).catch(console.warn);
	}
// get this from a url if user matches || selects new thingy ...
recieve('1::2');
