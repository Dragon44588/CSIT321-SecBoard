require("dotenv").config();
// import * as dotenv from 'dotenv';
// dotenv.config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.ACCESS_TOKEN_SECRET;

module.exports.generateToken = function (payload) {
	const token =
		"Bearer " +
		jwt.sign(payload, secretKey, {
			expiresIn: "12h",
		});
	return token;
};
