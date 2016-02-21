var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

/*
app.get('/', function (req, res) {
  res.send("Hello world\n");
});
*/
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	console.log('I have received a get request');

    /*
	person1 = {
		name: 'Sanjay',
		email: 'getsanjaysnair@gmail.com',
		number: '8722962071'
	};

	person2 = {
		name: 'Raju',
		email: 'raju@gmail.com',
		number: '123'
	};

	person3 = {
		name: 'Pinky',
		email: 'pinky@gmail.com',
		number: '456'
	};

	var contactList = [person1, person2, person3];
	res.json(contactList);
	*/

	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactlist', function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function (err, docs) {
		res.json(docs);
	});
});

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server is running on port 3000");
