const express = require('express');
const app = express()
const IM = require('./SendMsg');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// TEST DATA
const users = [
	{
		id: 1,
		username: 'Adam'
	},
	{
		id: 2,
		username: 'Eve'
	},
	{
		id: 3,
		username: 'Steve'
	},
	{
		id: 4,
		username: 'Alex'
	},
	{
		id: 5,
		username: 'User123'
	}	
]


// how to chats ...  
// 1. create a list of possible chats.

// 2. create a recieve if a 'send' was fired (auto)

// 3. create a timeout and stop the recieve (working on it)



app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/chat.html');
});


app.post('/', (req, res, next) => {
	let message = req.body.msg;

	// get this user using his auth token
	let user = users[0];
	// get this from the matching data
	let to = users[1];

	// This is roughly how a chatroom's name will be created
	if (user.id > to.id)
		name = to.id + '::' + user.id;
	else
		name = user.id + '::' + to.id;

	// create a new chat and add it to the db of existing chats here:


	// if a user selects a chat
		//1.	load the chat history if name in messages
		// 		(don't care about being done first / last)			IM.load(name);
	// if a user hits send
		//1.  use IM.send to send to frontend where that wil update using a event listner :)
			//1. send the name to create a listner
			//2. send the data through

	IM.send(name, message, user.username, to.username);
	res.redirect('/');
});


app.listen(3000);