import express from "express";
const user = express.Router();

import users from "../../data/users.json" assert { "type": "json" };

user.get("/", (req, res) => {
	let page = +req.query.page || 1;
	let limit = +req.query.limit || 5;
	let startIndex = (page - 1) * limit;
	let endIndex = page * limit;
	const results = {};

	if (endIndex < users.users.length) {
		results.next = {
			next: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			prev: page - 1,
			limit,
		};
	}

	results.users = users.users.slice(startIndex, endIndex);

	res.status(200).json({
		data: results,
	});
});

// user.post("/", (req, res) => {});

// user.delete("/", (req, res) => {});

export default user;
