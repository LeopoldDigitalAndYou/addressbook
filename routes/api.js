"use strict";

var PEOPLE = require('../data/people').people;
var MAX_ID = PEOPLE.length;

exports.query = function (req, res) {
	return res.status(200).json(PEOPLE);
};

exports.searchByName = function (req, res) {
	var nameSearch = req.params.name.toLowerCase();
	if(nameSearch) {
		var people = PEOPLE.filter(
				person => person.name.toLowerCase().includes(nameSearch)
		);
	}
	else {
		var people = PEOPLE;
	}
	return res.status(200).json(people);
};

exports.get = function (req, res) {
	var id = req.params.id;
	for(var person of PEOPLE) {
		if(person.id == id) {
			return res.status(200).json(person);
		}
	}
	return res.status(404);
};

exports.getBirthday = function (req, res) {
	throw new Error("not implemented");
};

exports.add = function (req, res) {
	throw new Error("not implemented");
};

exports.update = function (req, res) {
	throw new Error("not implemented");
};

exports.delete = function (req, res) {
	throw new Error("not implemented");
};
