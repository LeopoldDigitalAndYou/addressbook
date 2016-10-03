"use strict";

var PEOPLE = require('../data/people').people;
var MAX_ID = PEOPLE.length;

exports.badRequest = function (req, res) {
	return res.status(400).json({error: "Missing parametres"});
};

exports.query = function (req, res) {
	return res.status(200).json(PEOPLE);
};

exports.searchByName = function (req, res) {
	var nameSearch = req.params.name.toLowerCase();
	var people = PEOPLE.filter(
			person => person.name.toLowerCase().includes(nameSearch)
	);
	return res.status(200).json(people);
};

exports.get = function (req, res) {
	var id = req.params.id;
	for (var person of PEOPLE) {
		if (person.id == id) {
			return res.status(200).json(person);
		}
	}
	return res.status(404).json({error: "person not found"});
};

exports.getBirthday = function (req, res) {
	var id = req.params.id;
	for (var person of PEOPLE) {
		if (person.id == id) {
			var hasBirthday = person.birthdate && person.birthdate.day !== undefined && person.birthdate.month !== undefined;
			if (hasBirthday) {
				var birthday = {
					id: id,
					day: person.birthdate.day,
					month: person.birthdate.month
				};
				return res.status(200).json(birthday);
			}
			else {
				return res.status(404).json({error: "no recorded birthday"});
			}
		}
	}
	return res.status(404).json({error: "person not found"});
};

exports.add = function (req, res) {
	console.log('add ',req.body);
	var newPerson = req.body;
	MAX_ID += 1;
	newPerson.id = MAX_ID;
	PEOPLE.push(newPerson);
	return res.status(200).json(newPerson);
};

exports.update = function (req, res) {
	console.log('update ', req.params.id, ' with ', req.body);
	var id = req.params.id;
	var newPerson = req.body;
	newPerson.id = id;
	for(var ii = 0 ; ii <= MAX_ID ; ii++) {
		if(PEOPLE[ii].id == id) {
			PEOPLE[ii] = newPerson;
			return res.status(200).json(newPerson);
		}
	}
	res.status(304).json({error: "person not found"});
};

exports.delete = function (req, res) {
	var id = req.params.id;
	console.log('delete ', id);
	for(var ii = 0 ; ii <= MAX_ID ; ii++) {
		if(PEOPLE[ii].id == id) {
			PEOPLE.splice(ii, 1);
			return res.status(200).send();
		}
	}
	res.status(404).json({error: "person not found"});
};
